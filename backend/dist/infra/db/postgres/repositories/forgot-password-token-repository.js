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
exports.ForgotPasswordTokenRepository = void 0;
const typeorm_1 = require("typeorm");
const forgot_password_token_1 = __importDefault(require("../entities/forgot-password-token"));
class ForgotPasswordTokenRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(forgot_password_token_1.default);
    }
    save({ jwt, userEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.save({
                token: jwt,
                user_email: userEmail,
            });
        });
    }
    update(token) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Token no repo', token);
            try {
                const record = yield this.repository.findOne({ where: { token } });
                const updateRecord = Object.assign(Object.assign({}, record), { has_updated: true });
                yield this.repository.save(updateRecord);
            }
            catch (err) {
                throw new Error('Token not found');
            }
        });
    }
}
exports.ForgotPasswordTokenRepository = ForgotPasswordTokenRepository;
