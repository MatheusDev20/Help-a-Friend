"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableError = void 0;
const InvalidParamsError_1 = require("../../presentation/errors/InvalidParamsError");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const enableError = (err, request, response, _) => {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }
    if (err instanceof InvalidParamsError_1.InvalidParamError) {
        return response.status(400).json({
            statusCOde: 400,
            errors: err.errors.array(),
        });
    }
    console.error('Ta dando merda aqui -->', err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
};
exports.enableError = enableError;
