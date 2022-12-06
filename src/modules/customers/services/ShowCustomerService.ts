import CustomerRepository from '@repositories/CustomerRepository';
import { Customer } from '@entities/Customer';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomerRepository);

    const entity = await repository.findById(id);

    if (!entity) {
      throw new AppError(`Customer '${id}' not found.`, 404);
    }

    return entity;
  }
}
