import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { InvalidParamError } from '../../errors/InvalidParamsError';
import { ResetPassword } from '../../../domain/auth/useCases/reset-password-use-case';
import { Controller } from '../../protocols/controller';

export class ResetPasswordController implements Controller {
  private readonly useCase: ResetPassword;

  constructor(useCase: ResetPassword) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      throw new InvalidParamError(errors);
    }

    const { token, newPassword } = request.body;
    const userUpdated = await this.useCase.reset(String(token), newPassword);

    return response.json(userUpdated);
  }
}
