import { Request, Response } from 'express';
import { ResetPassword } from '../../../domain/auth/useCases/reset-password-use-case';
import { Controller } from '../../protocols/controller';

export class ResetPasswordController implements Controller {
  private readonly useCase: ResetPassword;

  constructor(useCase: ResetPassword) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    this.useCase.reset();
    return response.json({ message: 'It works' });
  }
}
