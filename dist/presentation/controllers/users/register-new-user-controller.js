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
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const InvalidParamsError_1 = require("../../errors/InvalidParamsError");
const Response_1 = __importDefault(require("../helpers/Response"));
class RegisterNewUserController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateEntry = (0, express_validator_1.validationResult)(request);
            if (!validateEntry.isEmpty())
                throw new InvalidParamsError_1.InvalidParamError(validateEntry);
            const { name, email, password, petPreference, } = request.body;
            const user = yield this.useCase.create({
                id: (0, uuid_1.v4)(),
                name,
                email,
                password,
                petPreference,
                admin: false,
            });
            const payload = new Response_1.default(200, user);
            return response.json(payload);
        });
    }
}
exports.default = RegisterNewUserController;
