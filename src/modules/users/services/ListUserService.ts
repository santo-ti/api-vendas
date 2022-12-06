import UserRepository from '@repositories/UserRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const repository = getCustomRepository(UserRepository);

    return await repository.find();
  }
}
