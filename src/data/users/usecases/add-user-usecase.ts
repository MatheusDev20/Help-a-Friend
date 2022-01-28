import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../../protocols/user-repository';
import { User } from '../../../domain/user/models/user';

import AppError from '../../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUsersRepository,
  ) { }

  public async add({ name, email, password }: Request): Promise<User> {
    const existedEmail = await this.userRepository.findByEmail(email);

    if (existedEmail) {
      throw new AppError('Email already Taken', 400);
    }
    const hashedPassword = await hash(password, 8);
    const randomId = v4();
    const user = this.userRepository.create({
      id: randomId,
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
export default CreateUserUseCase;
