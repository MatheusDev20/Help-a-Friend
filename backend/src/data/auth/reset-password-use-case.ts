import forgotPassConfig from '../../config/auth/forgot-pass';
import { Criptography } from '../protocols/criptography';
import AppError from '../../presentation/errors/AppError';
import { ResetPassword } from '../../domain/auth/useCases/reset-password-use-case';

export class ResetPasswordUseCase implements ResetPassword {
  private readonly verifyToken: Criptography;

  constructor(verifyToken: Criptography) {
    this.verifyToken = verifyToken;
  }

  public async reset(token: string): Promise<any> {
    const { secret } = forgotPassConfig;
    const { veredict, sub } = await this.verifyToken.verify({ token, secret });

    if (!veredict) {
      throw new AppError('You are not allowed to perform this operation', 403);
    }

    console.log(veredict, sub);
  }
}
