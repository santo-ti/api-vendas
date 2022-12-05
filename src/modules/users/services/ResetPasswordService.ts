import UsersRepository from '@repositories/UsersRepository';
import UserTokensRepository from '@repositories/UserTokensRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const repository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token not found.', 403);
    }

    const user = await repository.findById(userToken.userId);

    if (!user) {
      throw new AppError(`User '${userToken.userId}' not found.`, 404);
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', 403);
    }

    user.password = await hash(password, 16);

    await repository.save(user);
  }
}
