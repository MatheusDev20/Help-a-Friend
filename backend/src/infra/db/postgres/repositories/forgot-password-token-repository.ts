import { Repository, getRepository } from 'typeorm';
import { ForgotPasswordDTO } from '../../../../domain/auth/dtos/forgot-password-dto';
import { IForgotTokenRepository } from '../../../../data/protocols/repositorys/forgot-pass-token-repository';
import ForgotPasswordToken from '../entities/forgot-password-token';

export class ForgotPasswordTokenRepository implements IForgotTokenRepository {
  private repository: Repository<ForgotPasswordToken>; // Declarando o atributo do orm da classe

  constructor() {
    this.repository = getRepository(ForgotPasswordToken);
  }

  public async save({ jwt, userEmail }: ForgotPasswordDTO): Promise<void> {
    await this.repository.save({
      token: jwt,
      user_email: userEmail,
    });
  }
}
