import { IForgotTokenRepository } from '../protocols/repositorys/forgot-pass-token-repository';
import { GenerateToken } from '../protocols/criptography/generate-jwt';
import { ForgotPassword } from '../../domain/auth/useCases/forgot-password-usecase';
import forgotPassConfig from '../../config/auth/forgot-pass';

export class ForgotPasswordUseCase implements ForgotPassword {
  private readonly generateJwt: GenerateToken;

  private readonly repository: IForgotTokenRepository;

  constructor(generateJwt: GenerateToken, repository: IForgotTokenRepository) {
    this.generateJwt = generateJwt;
    this.repository = repository;
  }

  public async forgot(email: string): Promise<any> {
    const { secret, expiresIn } = forgotPassConfig;
    const forgotPassJwt = await this.generateJwt.generate({ sub: email, secret, expiresIn });
    await this.repository.save({ userEmail: email, jwt: forgotPassJwt });
    return forgotPassJwt;
  }
}
