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
exports.ResetPasswordUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const forgot_pass_1 = __importDefault(require("../../config/auth/forgot-pass"));
const AppError_1 = __importDefault(require("../../presentation/errors/AppError"));
class ResetPasswordUseCase {
    constructor(verifyToken, usersRepository, forgotTokenRepository) {
        this.verifyToken = verifyToken;
        this.usersRepository = usersRepository;
        this.forgotTokenRepository = forgotTokenRepository;
    }
    reset(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const { secret } = forgot_pass_1.default;
            const { veredict, sub } = yield this.verifyToken.verify({ token, secret });
            if (!veredict) {
                throw new AppError_1.default('You are not allowed to perform this operation', 403);
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(newPassword, 8);
            const updatedUser = yield this.usersRepository.update('password', hashedPassword, sub);
            yield this.forgotTokenRepository.update(token);
            return updatedUser;
        });
    }
}
exports.ResetPasswordUseCase = ResetPasswordUseCase;
