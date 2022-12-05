import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const repository = getCustomRepository(UsersRepository);

    return await repository.find();
  }
}
