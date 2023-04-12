/* eslint-disable max-len */
import nodemailer, { Transporter } from 'nodemailer';
import { MailOptions } from '../../domain/mail/send-mail';
import { MailResponse, MailService } from '../../domain/mail';
import { getEmailTemplate } from '../../utils';
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
          user: 'ubaldo28@ethereal.email',
          pass: 'nWCX4T43CyeJu9jNrv',
        },
      });
      this.client = transporter;
    });
  }

  public async send(mailOptions: MailOptions): Promise<MailResponse> {
    const emailConfig = {
      from: {
        name: 'Equipe Help a Friend',
        address: 'suport@helpafriend.com.br',
      },
      to: {
        name: mailOptions.userName,
        address: mailOptions.to,
      },
      subject: mailOptions.subject,
      html: getEmailTemplate(mailOptions.type)({ userName: mailOptions.userName, ...mailOptions.data }),
    };
    try {
      const { response, messageId } = await this.client.sendMail(emailConfig);
      return {
        response,
        messageId,
      };
    } catch (err) {
      throw new AppError('Email could not be sent');
    }
  }
}
