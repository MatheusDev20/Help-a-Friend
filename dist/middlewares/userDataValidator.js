"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../presentation/errors/AppError"));
function ValidateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (true);
    }
    return undefined;
}
function userDataValidation(request, _, next) {
    const { name, password, email } = request.body;
    if (typeof (name) !== 'string') {
        throw new AppError_1.default('Name should be a string value');
    }
    if (name.length > 20) {
        throw new AppError_1.default('Name should be a max of 20 Characters');
    }
    if (typeof (password) !== 'string') {
        throw new AppError_1.default('password should be a string value');
    }
    if (password.length < 6 || password.length > 10) {
        throw new AppError_1.default('Please enter a password between 6 and 10 characters');
    }
    const emailValidation = ValidateEmail(email);
    if (!emailValidation) {
        throw new AppError_1.default('Please enter a valid email address');
    }
    return next();
}
exports.default = userDataValidation;
