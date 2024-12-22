import { Repository } from 'typeorm';
import { source } from '../../helpers/postgres-conn-helper';
import { ForgotPasswordDTO } from '../../../../domain/auth/dtos/forgot-password-dto';
import { IForgotTokenRepository } from '../../../../data/protocols/repositorys/forgot-pass-token-repository';
import ForgotPasswordToken from '../entities/forgot-password-token';

export class ForgotPasswordTokenRepository implements IForgotTokenRepository {
  private repository: Repository<ForgotPasswordToken>; // Declarando o atributo do orm da classe

  constructor() {
    this.repository = source.getRepository(ForgotPasswordToken);
  }

  public async save({ jwt, userEmail }: ForgotPasswordDTO): Promise<void> {
    await this.repository.save({
      token: jwt,
      user_email: userEmail,
    });
  }

  public async update(token: string): Promise<void> {
    console.log('Token no repo', token);
    try {
      const record = await this.repository.findOne({ where: { token } });
      const updateRecord = {
        ...record,
        has_updated: true,
      };
      await this.repository.save(updateRecord);
    } catch (err) {
      throw new Error('Token not found');
    }
  }
}
