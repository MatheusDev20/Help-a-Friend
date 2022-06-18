import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { CreateNewUser } from 'domain/user/usecases/create-new-user';
import IUsersRepository from '../../protocols/user-repository';
import { User } from '../../../domain/user/models/user';

import AppError from '../../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserUseCase implements CreateNewUser {
  private readonly repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async create({ name, email, password }: Request): Promise<User> {
    const existedEmail = await this.repository.findByEmail(email);

    if (existedEmail) {
      throw new AppError('Email already Taken', 400);
    }
    const hashedPassword = await hash(password, 8);
    const randomId = v4();
    const user = this.repository.create({
      id: randomId,
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
export default CreateUserUseCase;
