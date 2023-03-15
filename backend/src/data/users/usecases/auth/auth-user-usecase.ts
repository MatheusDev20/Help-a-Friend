/* eslint-disable @typescript-eslint/no-unused-vars */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AuthenticatedUser } from '../../../../domain/user/dtos/AuthenticatedUser';
import AppError from '../../../../presentation/errors/AppError';
import authConfig from '../../../../config/auth';
import IUsersRepository from '../../../protocols/user-repository';

interface Request {
  authInfo: {
    email: string,
    userPassword: string
  }
}
interface Response {
  authUser: AuthenticatedUser
  token: string
  expiration: string;
}
class AuthorizationUseCase {
  private readonly repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async auth({ authInfo }: Request): Promise<Response> {
    const user = await this.repository.findByEmail(authInfo.email);

    if (!user) {
      throw new AppError('Not registered Email');
    }
    const passwordMatch = await compare(authInfo.userPassword, user.password);

    if (!passwordMatch) {
      throw new AppError('Wrong password');
    }

    const { secret, expiresIn } = authConfig;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    const {
      password, created_at, updated_at, ...authUser
    } = user;

    return {
      authUser, token, expiration: expiresIn,
    };
  }
}
export default AuthorizationUseCase;
