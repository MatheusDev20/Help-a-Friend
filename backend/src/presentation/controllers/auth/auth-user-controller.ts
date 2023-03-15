import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { InvalidParamError } from '../../errors/InvalidParamsError';
import { Controller } from '../../protocols/controller';
import AuthorizationUseCase from '../../../data/auth/auth-user-usecase';

class AuthController implements Controller {
  private readonly useCase: AuthorizationUseCase;

  constructor(useCase: AuthorizationUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) throw new InvalidParamError(errors);

    const { email, password } = request.body;

    const { token, expiration, authUser } = await this.useCase.auth(
      {
        authInfo: {
          email,
          userPassword: password,
        },
      },
    );

    return response.json({
      token, expiration, authUser,
    });
  }
}

export default AuthController;
