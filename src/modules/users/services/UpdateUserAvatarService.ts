import UserRepository from '@repositories/UserRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

interface IRequest {
  userId: string;
  avatarFileName?: string;
}

export default class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);

    const storageProvider = new DiskStorageProvider();

    if (!avatarFileName) {
      throw new AppError('Avatar file is required.');
    }

    const entity = await repository.findById(userId);

    if (!entity) {
      throw new AppError(`User '${userId}' not found.`, 404);
    }

    if (entity.avatar) {
      await storageProvider.deleteFile(entity.avatar);
    }

    const fileName = await storageProvider.saveFile(avatarFileName);

    entity.avatar = fileName;

    return await repository.save(entity);
  }
}
