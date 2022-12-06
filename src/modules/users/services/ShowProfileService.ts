import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  userId: string;
}

export default class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const repository = getCustomRepository(UsersRepository);

    const entity = await repository.findById(userId);

    if (!entity) {
      throw new AppError(`User '${userId}' not found.`, 404);
    }

    return entity;
  }
}
