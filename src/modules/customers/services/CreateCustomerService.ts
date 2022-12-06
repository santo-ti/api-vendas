import CustomerRepository from '@repositories/CustomerRepository';
import { Customer } from '@entities/Customer';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomerRepository);
    const entity = await repository.findByEmail(email);

    if (entity) {
      throw new AppError(`Email address '${email}' already used.`);
    }

    return await repository.createAndSave(name, email);
  }
}
