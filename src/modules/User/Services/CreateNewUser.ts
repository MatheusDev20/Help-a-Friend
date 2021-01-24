import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../Repositories/IUsersRepositoriy';
import User from '../Infra/typeorm/entities/User';

import AppError from '../../../errors/AppError';

interface Request {
    name:string;
    email:string;
    password:string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: Request):Promise<User> {
    const existedEmail = await this.userRepository.findByEmail(email);

    if (existedEmail) {
      throw new AppError('Email already Taken');
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
export default CreateUserService;
