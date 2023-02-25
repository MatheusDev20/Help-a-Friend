"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const multer_1 = __importDefault(require("multer"));
const express_validator_1 = require("express-validator");
const factories = __importStar(require("../factories/users-factory"));
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
const upload_1 = __importDefault(require("../../config/upload"));
const adapt = (controller) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.handle(req, res);
});
const upload = (0, multer_1.default)(upload_1.default);
exports.default = (router) => {
    router.post('/signup', (0, express_validator_1.body)('name').notEmpty().isLength({ max: 24 }), (0, express_validator_1.body)('password').notEmpty().isLength({ min: 8 }), (0, express_validator_1.body)('email').notEmpty().isEmail(), (0, express_validator_1.body)('petPreference').notEmpty(), adapt(factories.makeSignUpUserController()));
    router.delete('/delete', authorization_1.default, adapt(factories.makeDeleteUserController()));
    router.post('/login', (0, express_validator_1.body)('email').notEmpty().isEmail(), (0, express_validator_1.body)('password').notEmpty().isLength({ min: 8 }), adapt(factories.makeAuthUserController()));
    router.post('/avatar', authorization_1.default, upload.single('avatar'), adapt(factories.makeAvatarUpload()));
    router.get('/getProfile', authorization_1.default, adapt(factories.makeUserProfile()));
};
