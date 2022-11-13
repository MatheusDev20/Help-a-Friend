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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const auth_1 = __importDefault(require("../../../config/auth"));
class AuthorizationUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    auth({ authInfo }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findByEmail(authInfo.email);
            if (!user) {
                throw new AppError_1.default('Not registered Email');
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(authInfo.userPassword, user.password);
            if (!passwordMatch) {
                throw new AppError_1.default('Wrong password');
            }
            const { secret, expiresIn } = auth_1.default;
            const token = (0, jsonwebtoken_1.sign)({}, secret, {
                subject: user.id,
                expiresIn,
            });
            const { password, created_at, updated_at } = user, authUser = __rest(user, ["password", "created_at", "updated_at"]);
            return {
                authUser, token, expiration: expiresIn,
            };
        });
    }
}
exports.default = AuthorizationUseCase;
