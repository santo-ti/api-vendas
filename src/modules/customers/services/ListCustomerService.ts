import { Customer } from '@entities/Customer';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '@repositories/CustomerRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

export default class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const repository = getCustomRepository(CustomerRepository);

    const entity = await repository.createQueryBuilder().paginate();

    return entity as IPaginateCustomer;
  }
}
