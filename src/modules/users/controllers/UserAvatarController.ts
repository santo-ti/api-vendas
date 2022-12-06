import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userId = `${request.user.id}`;
    const avatarFileName = `${request.file?.filename}`;

    const service = new UpdateUserAvatarService();

    await service.execute({ userId, avatarFileName });

    return response.status(204).json();
  }
}
