import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const repository = getCustomRepository(UsersRepository);

    const entity = await repository.findById(userId);

    if (!entity) {
      throw new AppError(`User '${userId}' not found.`, 404);
    }

    if (entity.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, entity.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    entity.avatar = avatarFileName;

    return await repository.save(entity);
  }
}
