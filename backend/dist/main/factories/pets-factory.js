"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetPetInformationController = exports.makeListPetPageController = exports.makeListUserPetsController = exports.makeUploadPetPhotosController = exports.makeCreatePetController = void 0;
const get_pet_info_usecase_1 = require("../../data/pets/usecases/get-pet-info-usecase");
const get_pet_information_1 = require("../../presentation/controllers/pets/get-pet-information");
const user_repository_1 = __importDefault(require("../../infra/db/postgres/repositories/user-repository"));
const get_pet_page_1 = require("../../data/pets/usecases/get-pet-page");
const list_pets_page_1 = require("../../presentation/controllers/pets/list-pets-page");
const list_pet_usecase_1 = require("../../data/pets/usecases/list-pet-usecase");
const update_pet_photos_1 = __importDefault(require("../../presentation/controllers/pets/update-pet-photos"));
const update_dog_photos_1 = __importDefault(require("../../data/pets/usecases/update-dog-photos"));
const S3_1 = __importDefault(require("../../infra/storage/S3"));
const create_pet_controller_1 = __importDefault(require("../../presentation/controllers/pets/create-pet-controller"));
const list_user_pets_1 = require("../../presentation/controllers/pets/list-user-pets");
const create_pet_usecase_1 = __importDefault(require("../../data/pets/usecases/create-pet-usecase"));
const pets_repository_1 = __importDefault(require("../../infra/db/postgres/repositories/pets-repository"));
const makeCreatePetController = () => {
    const petRepository = new pets_repository_1.default();
    const userRepository = new user_repository_1.default();
    const createDogUseCase = new create_pet_usecase_1.default(petRepository, userRepository);
    const createDogController = new create_pet_controller_1.default(createDogUseCase);
    return createDogController;
};
exports.makeCreatePetController = makeCreatePetController;
const makeUploadPetPhotosController = () => {
    const petRepository = new pets_repository_1.default();
    const storage = new S3_1.default();
    const uploadPhotosUseCase = new update_dog_photos_1.default(petRepository, storage);
    const updatePetsPhotosController = new update_pet_photos_1.default(uploadPhotosUseCase);
    return updatePetsPhotosController;
};
exports.makeUploadPetPhotosController = makeUploadPetPhotosController;
const makeListUserPetsController = () => {
    const petRepository = new pets_repository_1.default();
    const listPetsUseCase = new list_pet_usecase_1.ListPetsPerUseCase(petRepository);
    const listPetsForUserController = new list_user_pets_1.GetUserPetsListController(listPetsUseCase);
    return listPetsForUserController;
};
exports.makeListUserPetsController = makeListUserPetsController;
const makeListPetPageController = () => {
    const petRepository = new pets_repository_1.default();
    const getPetPage = new get_pet_page_1.GetPetPage(petRepository);
    const listPetPageController = new list_pets_page_1.ListPetPage(getPetPage);
    return listPetPageController;
};
exports.makeListPetPageController = makeListPetPageController;
const makeGetPetInformationController = () => {
    const petRepository = new pets_repository_1.default();
    const getPetInfoUseCase = new get_pet_info_usecase_1.GetPetInfoUseCase(petRepository);
    const controller = new get_pet_information_1.GetPetInformation(getPetInfoUseCase);
    return controller;
};
exports.makeGetPetInformationController = makeGetPetInformationController;
