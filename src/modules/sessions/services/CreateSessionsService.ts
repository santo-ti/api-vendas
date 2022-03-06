import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

export default class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`Incorrect email/password combination.`, 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError(`Incorrect email/password combination.`, 401);
    }

    return user;
  }
}
