import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    return await usersRepository.find();
  }
}
