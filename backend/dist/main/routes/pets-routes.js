"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_validator_1 = require("express-validator");
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
const upload_1 = __importDefault(require("../../config/upload"));
const route_adapter_1 = __importDefault(require("./adapters/route-adapter"));
const pets_factory_1 = require("../factories/pets-factory");
const upload = (0, multer_1.default)(upload_1.default);
exports.default = (router) => {
    router.post('/pet', (0, express_validator_1.body)('name').notEmpty(), (0, express_validator_1.body)('gender').notEmpty().isLength({ max: 1 }), (0, express_validator_1.body)('size').notEmpty(), (0, express_validator_1.body)('history').notEmpty(), (0, express_validator_1.body)('castrated').notEmpty().isBoolean(), (0, express_validator_1.body)('vaccinated').notEmpty().isBoolean(), (0, express_validator_1.body)('city').notEmpty(), (0, express_validator_1.body)('uf').notEmpty(), (0, express_validator_1.body)('specie').notEmpty(), authorization_1.default, (0, route_adapter_1.default)((0, pets_factory_1.makeCreatePetController)()));
    router.post('/pet/upload', authorization_1.default, upload.array('photos', 4), (0, route_adapter_1.default)((0, pets_factory_1.makeUploadPetPhotosController)()));
    router.get('/pet/list', (0, express_validator_1.query)('page').notEmpty().isNumeric(), (0, route_adapter_1.default)((0, pets_factory_1.makeListPetPageController)()));
    router.get('/pet/:id', (0, express_validator_1.param)('id').notEmpty(), (0, route_adapter_1.default)((0, pets_factory_1.makeGetPetInformationController)()));
};
