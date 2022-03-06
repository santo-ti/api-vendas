import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default class UpdateProductService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError(`User '${id}' not found.`, 404);
    }

    const userEmailExists = await usersRepository.findByEmail(email);

    if (userEmailExists && email !== user.email) {
      throw new AppError(`Email address '${email}' already used.`);
    }

    const hashedPassword = await hash(password, 16);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    return await usersRepository.save(user);
  }
}
