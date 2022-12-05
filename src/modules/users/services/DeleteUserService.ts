import UsersRepository from '@repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(UsersRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`User '${id}' not found.`, 404);
    }

    await repository.remove(entity);
  }
}
