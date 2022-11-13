"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth_1 = __importDefault(require("../config/auth"));
function authorization(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('User is not Logged in ( Token is not provided )', 401);
    }
    const [, token] = authHeader.split(' ');
    const { secret } = auth_1.default;
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, secret);
        const { sub } = decoded;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        throw new AppError_1.default('Token is not valid', 401);
    }
}
exports.default = authorization;
