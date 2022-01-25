import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthorizationService from '../../../modules/User/Services/AuthorizationService';

class AuthController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authService = container.resolve(AuthorizationService);
    const { token, expiration } = await authService.execute({
      email,
      password,
    });
    return response.json({
      token, expiration,
    });
  }
}

export default AuthController;
