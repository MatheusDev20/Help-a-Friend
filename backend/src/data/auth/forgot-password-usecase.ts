import { Encrypter } from '../protocols/criptography/encrypter';
import { ForgotPassword } from '../../domain/auth/forgot-password-usecase';

export class ForgotPasswordUseCase implements ForgotPassword {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  public async forgot(email: string): Promise<any> {
    const forgotPassJwt = await this.encrypter.encrypt(email);
    return forgotPassJwt;
  }
}
