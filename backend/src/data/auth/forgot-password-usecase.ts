/* eslint-disable max-len */
import AppError from '../../presentation/errors/AppError';
import { ForgotPasswordResponse } from '../../domain/auth/dtos/forgot-password-dto';
import { MailService } from '../../domain/mail/send-mail';
import { IForgotTokenRepository } from '../protocols/repositorys/forgot-pass-token-repository';
import { Criptography } from '../protocols/criptography';
import { ForgotPassword } from '../../domain/auth/useCases/forgot-password-usecase';
import forgotPassConfig from '../../config/auth/forgot-pass';
import IUsersRepository from '../protocols/repositorys/user-repository';

export class ForgotPasswordUseCase implements ForgotPassword {
  private readonly generateJwt: Criptography;

  private readonly forgotTokenrepository: IForgotTokenRepository;

  private readonly mailService: MailService;

  private readonly usersRepository: IUsersRepository;

  constructor(
    generateJwt: Criptography,
    forgotTokenrepository: IForgotTokenRepository,
    mailService: MailService,
    usersRepository: IUsersRepository,
  ) {
    this.generateJwt = generateJwt;
    this.forgotTokenrepository = forgotTokenrepository;
    this.mailService = mailService;
    this.usersRepository = usersRepository;
  }

  public async forgot(email: string): Promise<ForgotPasswordResponse> {
    const usersExists = await this.usersRepository.findByEmail(email);
    if (!usersExists) {
      throw new AppError('Email not registered', 404);
    }

    const { secret, expiresIn } = forgotPassConfig;
    const { name } = usersExists;
    const forgotPassJwt = await this.generateJwt.generate({ sub: usersExists.id, secret, expiresIn });

    await this.forgotTokenrepository.save({ userEmail: email, jwt: forgotPassJwt });

    const sentEmailResponse = await this.mailService.send({
      to: email,
      type: 'forgot-password',
      subject: 'Reset de Senha',
      userName: name,
      data: {
        recoveryLink: `${process.env.APP_URL}?token=${forgotPassJwt}`,
      },
    });

    const { messageId } = sentEmailResponse;

    return {
      messageId,
      tokenExpiration: expiresIn,
    };
  }
}
