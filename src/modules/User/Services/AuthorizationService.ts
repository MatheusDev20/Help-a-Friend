import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import IUsersRepositoriy from '../Repositories/IUsersRepositoriy';
import AppError from '../../../errors/AppError';
import Users from '../Infra/typeorm/entities/User';
import authConfig from '../../../config/auth';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: Users;
  token: string
  expiration: string;
}
@injectable()
class AuthorizationService {
  constructor(
    @inject('UserRepository') private userRepository: IUsersRepositoriy,
  ) {
  }

  public async execute({ email, password }: Request): Promise<Response> {
    // Buscar no banco um usuário com este email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Not registered Email');
    }
    const passwordMatch = compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Passwords Dont Match');
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user, token, expiration: expiresIn,
    };
  }
}
export default AuthorizationService;
