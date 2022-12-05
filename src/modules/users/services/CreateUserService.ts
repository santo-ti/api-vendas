import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const repository = getCustomRepository(UsersRepository);
    const entity = await repository.findByEmail(email);

    if (entity) {
      throw new AppError(`Email address '${email}' already used.`);
    }

    const hashedPassword = await hash(password, 16);

    return await repository.createAndSave(name, email, hashedPassword);
  }
}
