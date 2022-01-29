import { container } from 'tsyringe';
import IDogsRepository from '@modules/Dogs/Repositories/IDogsRepository';
import DogsRepository from '../../infra/db/postgres/repositories/dogs-repository';
import IUsersRepository from '../../data/protocols/user-repository';
import UserRepository from '../../infra/db/postgres/repositories/user-repository';

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UserRepository,
);
container.registerSingleton<IDogsRepository>(
  'DogsRepository',
  DogsRepository,
);
