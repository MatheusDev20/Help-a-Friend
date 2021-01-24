import { container } from 'tsyringe';
import IUsersRepositorie from '../../modules/User/Repositories/IUsersRepositoriy';
import UserRepository from '../../modules/User/Infra/typeorm/repositories/UserRepository';

container.registerSingleton<IUsersRepositorie>(
  'UserRepository',
  UserRepository,
);
