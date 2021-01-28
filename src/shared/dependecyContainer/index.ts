import { container } from 'tsyringe';
import IDogsRepository from '@modules/Dogs/Repositories/IDogsRepository';
import DogsRepository from '../../modules/Dogs/Infra/typeorm/repositories/DogRepository';
import IUsersRepositorie from '../../modules/User/Repositories/IUsersRepositoriy';
import UserRepository from '../../modules/User/Infra/typeorm/repositories/UserRepository';

container.registerSingleton<IUsersRepositorie>(
  'UserRepository',
  UserRepository,
);
container.registerSingleton<IDogsRepository>(
  'DogsRepository',
  DogsRepository,
);
