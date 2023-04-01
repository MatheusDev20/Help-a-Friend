import { ForgotPasswordResponse } from '../../domain/auth/dtos/forgot-password-dto';
import { MailService } from '../../domain/mail/send-mail';
import { IForgotTokenRepository } from '../protocols/repositorys/forgot-pass-token-repository';
import { GenerateToken } from '../protocols/criptography/generate-jwt';
import { ForgotPassword } from '../../domain/auth/useCases/forgot-password-usecase';
import forgotPassConfig from '../../config/auth/forgot-pass';

export class ForgotPasswordUseCase implements ForgotPassword {
  private readonly generateJwt: GenerateToken;

  private readonly repository: IForgotTokenRepository;

  private readonly mailService: MailService;

  constructor(
    generateJwt: GenerateToken,
    repository: IForgotTokenRepository,
    mailService: MailService,
  ) {
    this.generateJwt = generateJwt;
    this.repository = repository;
    this.mailService = mailService;
  }

  public async forgot(email: string): Promise<ForgotPasswordResponse> {
    const { secret, expiresIn } = forgotPassConfig;
    const forgotPassJwt = await this.generateJwt.generate({ sub: email, secret, expiresIn });
    await this.repository.save({ userEmail: email, jwt: forgotPassJwt });

    const sentEmailResponse = await this.mailService.send(forgotPassJwt, email);
    return {
      ...sentEmailResponse,
      tokenExpiration: expiresIn,
    };
  }
}
