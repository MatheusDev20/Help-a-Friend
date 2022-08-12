import { ListPetsPerUseCase } from '../../data/pets/usecases/list-pet-usecase';
import UpdatePetsPhotosController from '../../presentation/controllers/pets/update-pet-photos';
import UploadPetPhotosUseCase from '../../data/pets/usecases/update-dog-photos';
import S3Storage from '../../infra/storage/S3';
import CreateDogsController from '../../presentation/controllers/pets/create-pet-controller';
import { GetUserPetsListController } from '../../presentation/controllers/pets/list-user-pets';
import { Controller } from '../../presentation/protocols/controller';
import CreatePetUseCase from '../../data/pets/usecases/create-pet-usecase';
import PetsRepository from '../../infra/db/postgres/repositories/pets-repository';

/* eslint-disable import/prefer-default-export */
const makeCreatePetController = (): Controller => {
  const petRepository = new PetsRepository();
  const createDogUseCase = new CreatePetUseCase(petRepository);

  const createDogController = new CreateDogsController(createDogUseCase);

  return createDogController;
};

const makeUploadPetPhotosController = (): Controller => {
  const petRepository = new PetsRepository();
  const storage = new S3Storage();
  const uploadPhotosUseCase = new UploadPetPhotosUseCase(petRepository, storage);

  const updatePetsPhotosController = new UpdatePetsPhotosController(uploadPhotosUseCase);

  return updatePetsPhotosController;
};

const makeListPetsController = (): Controller => {
  const petRepository = new PetsRepository();
  const listPetsUseCase = new ListPetsPerUseCase(petRepository);

  const listPetsForUserController = new GetUserPetsListController(listPetsUseCase);

  return listPetsForUserController;
};

export { makeCreatePetController, makeUploadPetPhotosController, makeListPetsController };
