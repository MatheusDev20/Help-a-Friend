/* eslint-disable @typescript-eslint/no-unused-vars */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { GenerateToken } from '../protocols/criptography/generate-jwt';
import { AuthenticatedUser } from '../../domain/user/dtos/AuthenticatedUser';
import AppError from '../../presentation/errors/AppError';
import authConfig from '../../config/auth/login-token';
import IUsersRepository from '../protocols/user-repository';

interface Request {
  authInfo: {
    email: string,
    userPassword: string
  }
}
interface Response {
  authUser: AuthenticatedUser
  token?: string
  jwt: string
  expiration: string;
}
class AuthorizationUseCase {
  private readonly repository: IUsersRepository;

  private readonly generateToken: GenerateToken;

  constructor(repository: IUsersRepository, generateToken: GenerateToken) {
    this.repository = repository;
    this.generateToken = generateToken;
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
    const jwt = await this.generateToken.generate({ expiresIn, secret, sub: user.id });

    // const token = sign({}, secret, {
    //   subject: user.id,
    //   expiresIn,
    // });
    const {
      password, created_at, updated_at, ...authUser
    } = user;

    return {
      authUser, jwt, expiration: expiresIn,
    };
  }
}
export default AuthorizationUseCase;
