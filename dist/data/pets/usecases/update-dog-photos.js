"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../errors/AppError"));
class UploadPetPhotosUseCase {
    constructor(repository, storage) {
        this.storage = storage;
        this.repository = repository;
    }
    upload({ userId, petName, filenames }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dogs = yield this.repository.findUserPets(userId);
            if (!dogs) {
                throw new AppError_1.default('This user have no dogs registerd');
            }
            const selectedDog = dogs.find((pet) => pet.name === petName);
            if (!selectedDog) {
                throw new AppError_1.default('Dog with this name was not Found');
            }
            const uploadedFiles = yield this.storage.uploadMultipleFiles(filenames, 'dogs');
            const photos = yield this.repository.updatePetPhotos(selectedDog, uploadedFiles);
            return photos;
        });
    }
}
exports.default = UploadPetPhotosUseCase;
