import { CreatedUserDTO } from '../../../infra/db/postgres/repositories/user-repository';
import CreateUserDTO from '../../../data/users/dto/create-user-dto';

export interface CreateNewUser {
  create: (user: CreateUserDTO) => Promise<CreatedUserDTO>
}
