import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = new ShowOrderService();

    const order = await service.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const service = new CreateOrderService();

    const order = await service.execute({ customer_id, products });

    return response.status(201).location(`/orders/${order.id}`).json(order);
  }
}
