import CustomerRepository from '@repositories/CustomerRepository';
import { Customer } from '@entities/Customer';
import { getCustomRepository } from 'typeorm';

export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const repository = getCustomRepository(CustomerRepository);

    return await repository.find();
  }
}
