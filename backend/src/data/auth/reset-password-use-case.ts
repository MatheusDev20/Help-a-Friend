import { MailService } from 'domain/mail/send-mail';
import { ResetPassword } from '../../domain/auth/useCases/reset-password-use-case';

export class ResetPasswordUseCase implements ResetPassword {
  private readonly mailClient: MailService;

  constructor(mailService: MailService) {
    this.mailClient = mailService;
  }

  public async reset(): Promise<any> {
    this.mailClient.send('It Works');
  }
}
