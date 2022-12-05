import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const service = new CreateSessionsService();

    const user = await service.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
