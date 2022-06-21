import { container } from 'tsyringe';
import IDogsRepository from '../../../../../data/protocols/pets-repository';
import DogsRepository from '../../repositories/pets-repository';
import IUsersRepository from '../../../../../data/protocols/user-repository';
import UserRepository from '../../repositories/user-repository';
import { Storage } from '../../../../../data/protocols/storage';
import S3Storage from '../../../../storage/S3';

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UserRepository,
);
container.registerSingleton<IDogsRepository>(
  'DogsRepository',
  DogsRepository,
);
container.registerSingleton<Storage>(
  'Storage',
  S3Storage,
);
