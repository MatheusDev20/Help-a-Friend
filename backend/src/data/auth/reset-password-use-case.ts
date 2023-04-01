import { hash } from 'bcryptjs';
import IUsersRepository from '../protocols/repositorys/user-repository';
import forgotPassConfig from '../../config/auth/forgot-pass';
import { Criptography } from '../protocols/criptography';
import AppError from '../../presentation/errors/AppError';
import { ResetPassword } from '../../domain/auth/useCases/reset-password-use-case';

export class ResetPasswordUseCase implements ResetPassword {
  private readonly verifyToken: Criptography;

  private readonly usersRepository: IUsersRepository;

  constructor(verifyToken: Criptography, usersRepository: IUsersRepository) {
    this.verifyToken = verifyToken;
    this.usersRepository = usersRepository;
  }

  public async reset(token: string, newPassword: string): Promise<any> {
    const { secret } = forgotPassConfig;

    const { veredict, sub } = await this.verifyToken.verify({ token, secret });

    if (!veredict) {
      throw new AppError('You are not allowed to perform this operation', 403);
    }

    const hashedPassword = await hash(newPassword, 8);
    const upatedUser = await this.usersRepository.update('password', hashedPassword, sub);
    return upatedUser;
  }
}
