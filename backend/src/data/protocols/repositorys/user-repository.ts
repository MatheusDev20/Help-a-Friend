/* eslint-disable no-unused-vars */
import { UpdatedUser } from '../../../domain/user/dtos/UpdatedUser';
import { UserProfile } from '../../../domain/user/dtos/UserProfile';
import { CreatedUserDTO } from '../../../infra/db/postgres/repositories/user-repository';
import CreateUserDTO from '../../users/dto/create-user-dto';
import { User } from '../../../domain/user/models/user';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  getUserProfile(id: string): Promise<UserProfile>
  create(data: CreateUserDTO): Promise<CreatedUserDTO>;
  save(user: User): Promise<void>;
  delete(user: User): Promise<User>
  update(property: string, value: any, id: string): Promise<UpdatedUser | undefined>
}

export default IUsersRepository;
