import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import AuthorizationUseCase from '../../../data/users/usecases/auth-user-usecase';

class AuthController implements Controller {
  private readonly useCase: AuthorizationUseCase;

  constructor(useCase: AuthorizationUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const { token, expiration } = await this.useCase.auth({
      email,
      password,
    });

    return response.json({
      token, expiration,
    });
  }
}

export default AuthController;
