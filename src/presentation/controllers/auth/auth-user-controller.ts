import { Request, Response } from 'express';
import AuthorizationUseCase from '../../../data/login/usecases/auth-user-usecase';

class AuthController {
  private readonly useCase: AuthorizationUseCase;

  constructor(useCase: AuthorizationUseCase) {
    this.useCase = useCase;
  }

  public async auth(request: Request, response: Response): Promise<Response> {
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
