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
const user_1 = __importDefault(require("../entities/user"));
class UserRepository {
    constructor() {
        this.userRepository = (0, typeorm_1.getRepository)(user_1.default);
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { email },
            });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id },
            });
            return user;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.create(data);
            yield this.userRepository.save(user);
            const createdUser = {
                email: user.email,
                id: user.id,
            };
            return createdUser;
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.createQueryBuilder()
                .delete()
                .from(user_1.default)
                .where('id =:id', { id: user.id })
                .execute();
            return user;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.save(user);
        });
    }
    getUserProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            const userProfile = {
                name: user === null || user === void 0 ? void 0 : user.name,
                email: user === null || user === void 0 ? void 0 : user.email,
                petPreference: user === null || user === void 0 ? void 0 : user.petPreference,
                admin: user === null || user === void 0 ? void 0 : user.admin,
                avatar: user === null || user === void 0 ? void 0 : user.avatar,
            };
            return userProfile;
        });
    }
    update(property, value, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToBeUpdated = yield this.findById(id);
                if (!userToBeUpdated) {
                    throw new Error('No user found to update');
                }
                const updatedUser = Object.assign(Object.assign({}, userToBeUpdated), { [property]: value });
                const response = yield this.userRepository.save(updatedUser);
                return {
                    userId: response.id,
                    updated_at: response.updated_at,
                };
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = UserRepository;
