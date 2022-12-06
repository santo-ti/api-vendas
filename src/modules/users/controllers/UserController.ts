import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const service = new ListUserService();

    const listUsers = await service.execute();

    return response.json(listUsers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = new ShowUserService();

    const user = await service.execute({ id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const service = new CreateUserService();

    const user = await service.execute({ name, email, password });

    return response.status(201).location(`/users/${user.id}`).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const service = new UpdateUserService();

    const user = await service.execute({ id, name, email, password });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = new DeleteUserService();

    await service.execute({ id });

    return response.status(204).json();
  }
}
