// import User from '../../modules/User/Infra/typeorm/entities/User';
import CreateUserDTO from '../users/dto/create-user-dto';
import { User } from '../../domain/user/models/user';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<void>;
  delete(user: User): Promise<User>
}

export default IUsersRepository;
