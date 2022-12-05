import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userId = `${request.user.id}`;
    const avatarFileName = `${request.file?.filename}`;

    const service = new UpdateUserAvatarService();

    const user = await service.execute({ userId, avatarFileName });

    return response.json(user);
  }
}
