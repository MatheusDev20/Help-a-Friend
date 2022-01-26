import { User } from '../models/user';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface CreateNewUser {
  create: (user: CreateUserDTO) => Promise<User>
}
