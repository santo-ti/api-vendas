import UserRepository from '@repositories/UserRepository';
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

export default class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`User '${id}' not found.`, 404);
    }

    const userEmailExists = await repository.findByEmail(email);

    if (userEmailExists && email !== entity.email) {
      throw new AppError(`Email address '${email}' already used.`);
    }

    const hashedPassword = await hash(password, 16);

    entity.name = name;
    entity.email = email;
    entity.password = hashedPassword;

    return await repository.save(entity);
  }
}
