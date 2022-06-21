import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../../../errors/AppError';
import { User } from '../../../domain/user/models/user';
import authConfig from '../../../config/auth';
import IUsersRepository from '../../protocols/user-repository';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string
  expiration: string;
}
class AuthorizationUseCase {
  private readonly repository: IUsersRepository

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async auth({ email, password }: Request): Promise<Response> {
    // Buscar no banco um usuário com este email
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('Not registered Email');
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Wrong password');
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
