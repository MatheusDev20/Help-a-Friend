"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authConfig = {
    secret: process.env.SECRET_JWT,
    expiresIn: '1d',
};
exports.default = authConfig;
