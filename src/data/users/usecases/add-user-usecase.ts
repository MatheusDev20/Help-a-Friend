/* eslint-disable no-param-reassign */
import { hash } from 'bcryptjs';
import { CreateNewUser } from 'domain/user/usecases/create-new-user';
import { CreatedUserDTO } from '../../../infra/db/postgres/repositories/user-repository';
import IUsersRepository from '../../protocols/user-repository';

import AppError from '../../../presentation/errors/AppError';
import CreateUserDTO from '../dto/create-user-dto';

class CreateUserUseCase implements CreateNewUser {
  private readonly repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async create(userData: CreateUserDTO): Promise<CreatedUserDTO> {
    const existedEmail = await this.repository.findByEmail(userData.email);

    if (existedEmail) {
      throw new AppError('Email already Taken', 400);
    }

    userData.password = await hash(userData.password, 8);

    const createdUser = this.repository.create(userData);
    return createdUser;
  }
}
export default CreateUserUseCase;
