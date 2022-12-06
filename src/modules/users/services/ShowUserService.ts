import UserRepository from '@repositories/UserRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class ListUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`User '${id}' not found.`, 404);
    }

    return entity;
  }
}
