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
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../presentation/errors/AppError"));
class JwtAdapter {
    generate({ sub, secret, expiresIn }) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign({}, secret, {
                subject: sub,
                expiresIn,
            });
            return accessToken;
        });
    }
    verify({ token, secret }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                try {
                    const decoded = jsonwebtoken_1.default.verify(token, secret);
                    resolve({
                        veredict: true,
                        sub: decoded.sub,
                    });
                }
                catch (err) {
                    throw new AppError_1.default('Token inválido', 401);
                }
            });
        });
    }
}
exports.JwtAdapter = JwtAdapter;
