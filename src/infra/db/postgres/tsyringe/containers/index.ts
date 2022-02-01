import { container } from 'tsyringe';
import IDogsRepository from '../../../../../data/protocols/dogs-repository';
import DogsRepository from '../../repositories/dogs-repository';
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
