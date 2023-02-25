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
const uuid_1 = require("uuid");
const AppError_1 = __importDefault(require("../../../presentation/errors/AppError"));
class CreatePetUseCase {
    constructor(petRepository, userRepository) {
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }
    create({ name, gender, size, history, castrated, vaccinated, user_id, city, uf, specie, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield this.userRepository.findById(user_id);
            const pet_owner_email = userInfo === null || userInfo === void 0 ? void 0 : userInfo.email;
            const pets = yield this.petRepository.findUserPets(user_id);
            if (pets) {
                if (pets.length > 4) {
                    throw new AppError_1.default('User could not register more than 5 Dogs');
                }
            }
            const randomId = (0, uuid_1.v4)();
            const pet_location = `${city}, ${uf}`;
            const pet = yield this.petRepository.create({
                id: randomId,
                user_id,
                name,
                gender,
                size,
                history,
                castrated,
                vaccinated,
                city,
                uf,
                pet_location,
                pet_owner_email,
                specie,
            });
            return {
                id: pet.id,
                name: pet.name,
            };
        });
    }
}
exports.default = CreatePetUseCase;
