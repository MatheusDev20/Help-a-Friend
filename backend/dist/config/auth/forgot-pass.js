"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgotPassConfig = {
    secret: process.env.SECRET_FORGOT_PASSWORD,
    expiresIn: '300000',
};
exports.default = forgotPassConfig;
