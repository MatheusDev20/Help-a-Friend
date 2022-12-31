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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const AppError_1 = __importDefault(require("../../../presentation/errors/AppError"));
const upload_1 = __importDefault(require("../../../config/upload"));
class UpdateUserAvatarUseCase {
    constructor(repository, storage) {
        this.repository = repository;
        this.storage = storage;
    }
    update({ id, filename }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findById(id);
            if (!user) {
                throw new AppError_1.default('User not authenticated', 401);
            }
            if (user.avatar) {
                const file = user.avatar.split('/');
                const UserAvatarFilePath = path_1.default.join(upload_1.default.directory, file[file.length - 1]);
                const userAvatarFileExists = yield fs_1.default.promises.stat(UserAvatarFilePath);
                if (userAvatarFileExists) {
                    yield fs_1.default.promises.unlink(UserAvatarFilePath);
                }
            }
            const file = yield this.storage.uploadFile(filename, 'users');
            const avatarUrl = process.env.ENVIROMENT === 'PROD'
                ? `${process.env.STORAGE_URL}/${file}`
                : `${process.env.STORAGE_URL}/${file}`;
            user.avatar = avatarUrl;
            this.repository.save(user);
            return user;
        });
    }
}
exports.default = UpdateUserAvatarUseCase;
