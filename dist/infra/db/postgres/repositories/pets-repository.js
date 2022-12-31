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
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const AppError_1 = __importDefault(require("../../../../presentation/errors/AppError"));
const pets_1 = __importDefault(require("../entities/pets"));
class PetsRepository {
    constructor() {
        this.petsRepository = (0, typeorm_1.getRepository)(pets_1.default);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const pet = this.petsRepository.create(data);
            yield this.petsRepository.save(pet);
            return pet;
        });
    }
    findUserPets(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pets = yield this.petsRepository.find({ where: { user_id } });
            return pets;
        });
    }
    listAllUserPets() {
        return __awaiter(this, void 0, void 0, function* () {
            const allDogs = yield this.petsRepository
                .createQueryBuilder('pets')
                .getMany();
            return allDogs;
        });
    }
    save(pet) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.petsRepository.save(pet);
        });
    }
    updatePetPhotos(pet, imgLinks) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pet.pet_photos) {
                const photos = JSON.parse(pet.pet_photos);
                imgLinks.forEach((img) => {
                    photos.push({
                        imgId: (0, uuid_1.v4)(),
                        url: `${process.env.STORAGE_URL}/${img}`,
                    });
                });
                pet.pet_photos = JSON.stringify(photos);
                yield this.petsRepository.save(pet);
                return photos;
            }
            const photos = [];
            imgLinks.forEach((img) => {
                photos.push({
                    imgId: (0, uuid_1.v4)(),
                    url: `${process.env.STORAGE_URL}/${img}`,
                });
            });
            pet.pet_photos = JSON.stringify(photos);
            yield this.petsRepository.save(pet);
            return photos;
        });
    }
    getPage(page, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (Number(page) - 1) * 10;
            if (!filters) {
                const [result] = yield this.petsRepository.findAndCount({
                    take: 10,
                    skip,
                });
                return result;
            }
            Object.keys(filters).forEach((key) => {
                if (!filters[key]) {
                    delete filters[key];
                }
            });
            const [filtered] = yield this.petsRepository.findAndCount({
                where: filters,
                take: 10,
                skip,
            });
            return filtered;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pet = yield this.petsRepository.find({
                where: {
                    id,
                },
            });
            if (pet.length === 0)
                throw new AppError_1.default('Pet not found', 404);
            return pet[0];
        });
    }
}
exports.default = PetsRepository;
