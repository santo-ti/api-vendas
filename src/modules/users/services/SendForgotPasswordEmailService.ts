import UsersRepository from '@repositories/UsersRepository';
import UserTokensRepository from '@repositories/UserTokensRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const repository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await repository.findByEmail(email);

    if (!user) {
      throw new AppError(`E-mail '${email}' not found.`, 404);
    }

    const userToken = await userTokensRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${userToken?.token}`,
    });
  }
}
