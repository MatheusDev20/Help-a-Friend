import { UserProfile } from '../../domain/user/dtos/UserProfile';
import { CreatedUserDTO } from '../../infra/db/postgres/repositories/user-repository';
// import User from '../../modules/User/Infra/typeorm/entities/User';
import CreateUserDTO from '../users/dto/create-user-dto';
import { User } from '../../domain/user/models/user';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  getUserProfile(id: string): Promise<UserProfile>
  create(data: CreateUserDTO): Promise<CreatedUserDTO>;
  save(user: User): Promise<void>;
  delete(user: User): Promise<User>
}

export default IUsersRepository;
