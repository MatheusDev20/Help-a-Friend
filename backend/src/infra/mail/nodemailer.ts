import nodemailer, { Transporter } from 'nodemailer';
import { MailService } from '../../domain/mail/send-mail';

export class Nodemailer implements MailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      console.log(account);
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async send(): Promise<void> {
    const mailOptions = {
      from: {
        name: 'Equipe Help a Friend',
        address: 'suport@helpafriend.com.br',
      },
      to: {
        name: 'Teste',
        address: 'yofid86026@etondy.com',
      },
      subject: 'Reset de senha',
      html: '<p>ALO</p>',
    };
    try {
      const info = await this.client.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (err) {
      console.log(err);
    }
  }
}
