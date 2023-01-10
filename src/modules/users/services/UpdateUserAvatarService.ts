import UserRepository from '@repositories/UserRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  userId: string;
  avatarFileName?: string;
}

export default class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);

    if (!avatarFileName) {
      throw new AppError('Avatar file is required.');
    }

    const entity = await repository.findById(userId);

    if (!entity) {
      throw new AppError(`User '${userId}' not found.`, 404);
    }

    if (uploadConfig.driver === 's3') {
      const storageProvider = new S3StorageProvider();

      if (entity.avatar) {
        await storageProvider.deleteFile(entity.avatar);
      }

      const filename = await storageProvider.saveFile(avatarFileName);
      entity.avatar = filename;
    } else {
      const storageProvider = new DiskStorageProvider();

      if (entity.avatar) {
        await storageProvider.deleteFile(entity.avatar);
      }

      const filename = await storageProvider.saveFile(avatarFileName);
      entity.avatar = filename;
    }

    return await repository.save(entity);
  }
}
