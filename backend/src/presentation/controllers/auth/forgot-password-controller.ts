import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ForgotPassword } from '../../../domain/user/usecases/auth/forgot-password-usecase';
import { InvalidParamError } from '../../errors/InvalidParamsError';
import { Controller } from '../../protocols/controller';

export class ForgotPasswordController implements Controller {
  private readonly useCase: ForgotPassword;

  constructor(useCase: ForgotPassword) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new InvalidParamError(errors);
    }
    const { email } = request.query;
    const res = await this.useCase.forgot(String(email));
    return response.json({ message: res });
  }
}
