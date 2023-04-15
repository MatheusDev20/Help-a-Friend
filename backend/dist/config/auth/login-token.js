"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authConfig = {
    secret: process.env.SECRET_JWT_LOGIN,
    expiresIn: '1d',
};
exports.default = authConfig;
