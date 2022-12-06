import CustomerRepository from '@repositories/CustomerRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(CustomerRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`Customer '${id}' not found.`, 404);
    }

    await repository.remove(entity);
  }
}
