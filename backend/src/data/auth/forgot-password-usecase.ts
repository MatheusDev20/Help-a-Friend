import { GenerateToken } from '../protocols/criptography/generate-jwt';
import { ForgotPassword } from '../../domain/auth/forgot-password-usecase';
import forgotPassConfig from '../../config/auth/forgot-pass';

export class ForgotPasswordUseCase implements ForgotPassword {
  private readonly generateJwt: GenerateToken;

  constructor(generateJwt: GenerateToken) {
    this.generateJwt = generateJwt;
  }

  public async forgot(email: string): Promise<any> {
    const { secret, expiresIn } = forgotPassConfig;
    const forgotPassJwt = await this.generateJwt.generate({ sub: email, secret, expiresIn });
    return forgotPassJwt;
  }
}
