import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { Order } from '@entities/Order';
import OrderRepository from '@repositories/OrderRepository';

interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const repository = getCustomRepository(OrderRepository);

    const entity = await repository.findById(id);

    if (!entity) {
      throw new AppError(`Order '${id}' not found.`, 404);
    }

    return entity;
  }
}
