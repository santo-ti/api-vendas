import { EntityRepository, Repository } from 'typeorm';
import { User } from '@entities/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    return this.findOne({ name });
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.findOne({ id });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }

  public async createAndSave(name: string, email: string, password: string) {
    const entity = this.create({
      name,
      email,
      password,
    });

    return this.save(entity);
  }
}
