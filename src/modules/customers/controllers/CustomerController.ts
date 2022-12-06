import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const service = new ListCustomerService();

    const listCustomers = await service.execute();

    return response.json(listCustomers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = new ShowCustomerService();

    const customer = await service.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const service = new CreateCustomerService();

    const customer = await service.execute({ name, email });

    return response.status(201).location(`/customers/${customer.id}`).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const service = new UpdateCustomerService();

    const customer = await service.execute({ id, name, email });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = new DeleteCustomerService();

    await service.execute({ id });

    return response.status(204).json();
  }
}
