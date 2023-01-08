import UserRepository from '@repositories/UserRepository';
import UserTokenRepository from '@repositories/UserTokenRepository';
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
    const repository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError(`User Token '${token}' not found.`, 404);
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
