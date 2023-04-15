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
exports.ResetPasswordController = void 0;
const express_validator_1 = require("express-validator");
const InvalidParamsError_1 = require("../../errors/InvalidParamsError");
class ResetPasswordController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(request);
            if (!errors.isEmpty()) {
                throw new InvalidParamsError_1.InvalidParamError(errors);
            }
            const { token, newPassword } = request.body;
            const userUpdated = yield this.useCase.reset(String(token), newPassword);
            return response.json(userUpdated);
        });
    }
}
exports.ResetPasswordController = ResetPasswordController;
