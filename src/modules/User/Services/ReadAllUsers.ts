import { inject, injectable } from 'tsyringe';
import UserRepository from '../Infra/typeorm/repositories/UserRepository';

interface ReadedUsers {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
@injectable()
class ReadAllUsers {
  constructor(@inject('UserRepository') private userRepository: UserRepository) { }

  public async execute(): Promise<ReadedUsers[]> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}

export default ReadAllUsers;
