import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '@entities/Customer';

@EntityRepository(Customer)
export default class CustomerRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    return this.findOne({ name });
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return this.findOne({ id });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return this.findOne({ email });
  }

  public async createAndSave(name: string, email: string) {
    const entity = this.create({
      name,
      email,
    });

    return this.save(entity);
  }
}
