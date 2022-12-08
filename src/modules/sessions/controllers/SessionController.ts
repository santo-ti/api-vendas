import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';
import { instanceToInstance } from 'class-transformer';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const service = new CreateSessionService();

    const user = await service.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
