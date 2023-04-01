import nodemailer, { Transporter } from 'nodemailer';
import { MailResponse, MailService } from '../../domain/mail';
import AppError from '../../presentation/errors/AppError';

export class Nodemailer implements MailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: 'deron.kulas91@ethereal.email',
          pass: 'Kzr8mN8HmqC7A5Tx7N',
        },
      });
      this.client = transporter;
    });
  }

  public async send(text: string, mail: string): Promise<MailResponse> {
    const mailOptions = {
      from: {
        name: 'Equipe Help a Friend',
        address: 'suport@helpafriend.com.br',
      },
      to: {
        name: 'Teste',
        address: mail,
      },
      subject: 'Reset de senha',
      html: `<span>${text}</span>`,
    };
    try {
      const { response, messageId } = await this.client.sendMail(mailOptions);
      return {
        response,
        messageId,
      };
    } catch (err) {
      throw new AppError('Email could not be sent');
    }
  }
}
