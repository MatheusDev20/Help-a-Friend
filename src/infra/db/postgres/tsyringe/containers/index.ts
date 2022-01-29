import { container } from 'tsyringe';
import IDogsRepository from '../../../../../data/protocols/dogs-repository';
import DogsRepository from '../../repositories/dogs-repository';
import IUsersRepository from '../../../../../data/protocols/user-repository';
import UserRepository from '../../repositories/user-repository';

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UserRepository,
);
container.registerSingleton<IDogsRepository>(
  'DogsRepository',
  DogsRepository,
);
