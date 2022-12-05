import UsersRepository from '@repositories/UsersRepository';
import { User } from '@entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const repository = getCustomRepository(UsersRepository);
    const entity = await repository.findByEmail(email);

    if (!entity) {
      throw new AppError(`Incorrect email/password combination.`, 401);
    }

    const passwordConfirmed = await compare(password, entity.password);

    if (!passwordConfirmed) {
      throw new AppError(`Incorrect email/password combination.`, 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: entity.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user: entity, token };
  }
}
