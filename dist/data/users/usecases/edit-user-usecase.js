"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../errors/AppError"));
class EditUserUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    edit(email, name, password) {
        return new Promise((reject, resolve) => {
            console.log('?');
            this.repository.findByEmail(email).then((usr) => {
                if (!usr) {
                    const err = new AppError_1.default('Unable to find user', 404);
                    reject(err);
                }
                const newUser = Object.assign({ email,
                    name,
                    password }, usr);
                resolve(newUser);
            });
        });
    }
}
exports.default = EditUserUseCase;
