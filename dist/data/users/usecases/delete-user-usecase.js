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
class DeleteUserUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    delete(email, loggedId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToBeDeleted = yield this.repository.findByEmail(email);
            const loggedUser = yield this.repository.findById(loggedId);
            if (!userToBeDeleted) {
                throw new AppError_1.default('User not founded', 404);
            }
            if ((loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.email) === userToBeDeleted.email) {
                throw new AppError_1.default('Cannot deleted current logged user', 400);
            }
            const deletedUser = yield this.repository.delete(userToBeDeleted);
            const payload = {
                name: deletedUser.name,
                email: deletedUser.email,
                msg: 'User sucesfully deleted',
            };
            return payload;
        });
    }
}
exports.default = DeleteUserUseCase;
