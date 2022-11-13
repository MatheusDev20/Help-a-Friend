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
const AppError_1 = __importDefault(require("../../../errors/AppError"));
class UpdatePetsPhotosController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = request.query;
            if (!name) {
                throw new AppError_1.default('Please provide a dog name');
            }
            if (!request.files) {
                throw new AppError_1.default('At least one file is required');
            }
            const filenames = [];
            request.files.map((photo) => {
                filenames.push(photo.filename);
            });
            const uploadedPhotos = yield this.useCase.upload({
                userId: request.user.id,
                petName: name,
                filenames,
            });
            return response.json(uploadedPhotos);
        });
    }
}
exports.default = UpdatePetsPhotosController;
