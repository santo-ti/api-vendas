import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  public async execute({ userId, name, email, password, old_password }: IRequest): Promise<User> {
    const repository = getCustomRepository(UsersRepository);

    const entity = await repository.findById(userId);

    if (!entity) {
      throw new AppError(`User '${userId}' not found.`, 404);
    }

    const entityEmail = await repository.findByEmail(email);

    if (entityEmail && entityEmail.id !== userId) {
      throw new AppError(`There is already one user with this e-mail address '${email}'.`);
    }

    if (password && !old_password) {
      throw new AppError('Ol password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, entity.password);

      if (!checkOldPassword) {
        throw new AppError('Ol password does not match.');
      }

      entity.password = await hash(password, 16);
    }

    entity.name = name;
    entity.email = email;

    return await repository.save(entity);
  }
}
