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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPetsPerUseCase = void 0;
class ListPetsPerUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    list(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pets = yield this.repository.findUserPets(user_id);
            const petsInfo = pets === null || pets === void 0 ? void 0 : pets.map((pet) => ({
                name: pet.name,
                gender: pet.gender,
                user_id: pet.user_id,
                history: pet.history,
                castrated: pet.castrated,
                vaccinated: pet.vaccinated,
                pet_photos: pet.pet_photos,
                pet_location: pet.pet_location,
            }));
            return petsInfo;
        });
    }
}
exports.ListPetsPerUseCase = ListPetsPerUseCase;
