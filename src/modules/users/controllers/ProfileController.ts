import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const service = new ShowProfileService();

    const user = await service.execute({ userId });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password, old_password } = request.body;

    const service = new UpdateProfileService();

    const user = await service.execute({
      userId,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
