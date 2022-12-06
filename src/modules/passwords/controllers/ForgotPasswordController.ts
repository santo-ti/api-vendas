import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async send(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const service = new SendForgotPasswordEmailService();

    await service.execute({ email });

    return response.status(204).json();
  }
}
