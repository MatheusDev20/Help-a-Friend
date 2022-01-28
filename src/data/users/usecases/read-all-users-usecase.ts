import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../protocols/user-repository';
import { User } from '../../../domain/user/models/user';

@injectable()
class ReadAllUsersUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) { }

  public async read(): Promise<User[] | null> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}

export default ReadAllUsersUseCase;
