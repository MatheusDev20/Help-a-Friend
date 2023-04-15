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
exports.ForgotPasswordUseCase = void 0;
const AppError_1 = __importDefault(require("../../presentation/errors/AppError"));
const forgot_pass_1 = __importDefault(require("../../config/auth/forgot-pass"));
class ForgotPasswordUseCase {
    constructor(generateJwt, forgotTokenrepository, mailService, usersRepository) {
        this.generateJwt = generateJwt;
        this.forgotTokenrepository = forgotTokenrepository;
        this.mailService = mailService;
        this.usersRepository = usersRepository;
    }
    forgot(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersExists = yield this.usersRepository.findByEmail(email);
            if (!usersExists) {
                throw new AppError_1.default('Email not registered', 404);
            }
            const { secret, expiresIn } = forgot_pass_1.default;
            const { name } = usersExists;
            const forgotPassJwt = yield this.generateJwt.generate({ sub: usersExists.id, secret, expiresIn });
            yield this.forgotTokenrepository.save({ userEmail: email, jwt: forgotPassJwt });
            const sentEmailResponse = yield this.mailService.send({
                to: email,
                type: 'forgot-password',
                subject: 'Reset de Senha',
                userName: name,
                data: {
                    recoveryToken: forgotPassJwt,
                },
            });
            const { messageId } = sentEmailResponse;
            return {
                messageId,
                tokenExpiration: expiresIn,
            };
        });
    }
}
exports.ForgotPasswordUseCase = ForgotPasswordUseCase;
