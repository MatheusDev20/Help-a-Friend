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
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
class CreateUserUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedEmail = yield this.repository.findByEmail(userData.email);
            if (existedEmail) {
                throw new AppError_1.default('Email already Taken', 400);
            }
            userData.password = yield (0, bcryptjs_1.hash)(userData.password, 8);
            const createdUser = this.repository.create(userData);
            return createdUser;
        });
    }
}
exports.default = CreateUserUseCase;
