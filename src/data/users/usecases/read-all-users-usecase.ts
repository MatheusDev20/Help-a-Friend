import IUsersRepository from '../../protocols/user-repository';
import { User } from '../../../domain/user/models/user';

class ReadAllUsersUseCase {
  private readonly repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async read(): Promise<User[]> {
    const users = await this.repository.getAllUsers();
    return users;
  }
}

export default ReadAllUsersUseCase;
