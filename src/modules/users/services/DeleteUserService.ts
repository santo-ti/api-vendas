import UserRepository from '@repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
// import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

interface IRequest {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(UserRepository);

    // const storageProvider = new DiskStorageProvider();

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`User '${id}' not found.`, 404);
    }

    // await storageProvider.deleteFile(entity.avatar);
    await repository.remove(entity);
  }
}
