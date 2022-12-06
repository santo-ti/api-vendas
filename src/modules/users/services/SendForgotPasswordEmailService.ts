import UsersRepository from '@repositories/UsersRepository';
import UserTokensRepository from '@repositories/UserTokensRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

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

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token${token}`,
        },
      },
    });
  }
}
