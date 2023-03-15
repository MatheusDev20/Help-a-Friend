import { ForgotPassword } from '../../domain/auth/forgot-password-usecase';

export class ForgotPasswordUseCase implements ForgotPassword {
  public forgot(email: string): Promise<any> {
    const test = new Promise((resolve, _) => {
      resolve(`Request an forgot password link to mail ${email}`);
    });

    return test;
  }
}
