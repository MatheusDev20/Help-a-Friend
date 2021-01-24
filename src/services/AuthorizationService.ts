import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import Users from '../modules/User/Infra/typeorm/entities/User';
import authConfig from '../config/auth';

interface Request {
    email: string;
    password: string;
}
interface Response {
    user: Users;
    token: string
}
class AuthorizationService {
  public async execute({ email, password }: Request): Promise<Response> {
    // Buscar no banco um usuário com este email
    const userRepository = getRepository(Users);
    const user = await userRepository.findOne({ where: { email } });
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
      user, token,
    };
  }
}
export default AuthorizationService;
