import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userEmailExists = await usersRepository.findByEmail(email);

    if (userEmailExists) {
      throw new AppError(`Email address '${email}' already used.`);
    }

    return await usersRepository.createAndSave(name, email, password);
  }
}
