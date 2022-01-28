import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import AuthorizationService from '../../../modules/User/Services/AuthorizationService';
import AuthorizationUseCase from '../../../data/login/usecases/auth-user-usecase';

class AuthController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const useCase = container.resolve(AuthorizationUseCase);
    const { token, expiration } = await useCase.auth({
      email,
      password,
    });
    return response.json({
      token, expiration,
    });
  }
}

export default AuthController;
