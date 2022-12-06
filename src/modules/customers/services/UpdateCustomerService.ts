import CustomerRepository from '@repositories/CustomerRepository';
import { Customer } from '@entities/Customer';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomerRepository);

    const entity = await repository.findOne(id);

    if (!entity) {
      throw new AppError(`Customer '${id}' not found.`, 404);
    }

    const entityEmail = await repository.findByEmail(email);

    if (entityEmail && email !== entity.email) {
      throw new AppError(`There is already one customer with this e-mail address '${email}'.`);
    }

    entity.name = name;
    entity.email = email;

    return await repository.save(entity);
  }
}
