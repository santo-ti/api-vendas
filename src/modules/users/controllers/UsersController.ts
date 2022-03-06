import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const serviceUser = new ListUserService();

    const listUsers = await serviceUser.execute();

    return response.json(listUsers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const serviceUser = new ShowUserService();

    const user = await serviceUser.execute({ id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const serviceUser = new CreateUserService();

    const user = await serviceUser.execute({ name, email, password });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const serviceUser = new UpdateUserService();

    const user = await serviceUser.execute({ id, name, email, password });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const serviceUser = new DeleteUserService();

    const user = await serviceUser.execute({ id });

    return response.json(user);
  }
}
