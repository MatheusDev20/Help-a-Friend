import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import IUsersRepositoriy from '../../protocols/user-repository';
import AppError from '../../../errors/AppError';
import { User } from '../../../domain/user/models/user';
import authConfig from '../../../config/auth';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string
  expiration: string;
}
@injectable()
class AuthorizationUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUsersRepositoriy,
  ) {
  }

  public async auth({ email, password }: Request): Promise<Response> {
    // Buscar no banco um usuário com este email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Not registered Email');
    }
    const passwordMatch = compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Passwords Dont Match');
    }
    const { secret, expiresIn } = authConfig;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user, token, expiration: expiresIn,
    };
  }
}
export default AuthorizationUseCase;
