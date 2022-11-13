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
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const InvalidParamsError_1 = require("../../errors/InvalidParamsError");
class AuthController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(request);
            if (!errors.isEmpty())
                throw new InvalidParamsError_1.InvalidParamError(errors);
            const { email, password } = request.body;
            const { token, expiration, authUser } = yield this.useCase.auth({
                authInfo: {
                    email,
                    userPassword: password,
                },
            });
            return response.json({
                token, expiration, authUser,
            });
        });
    }
}
exports.default = AuthController;
