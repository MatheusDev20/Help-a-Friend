"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const tmpFolder = path_1.default.join(__dirname, '..', '..', 'tmp');
const storage = multer_1.default.diskStorage({
    destination: tmpFolder,
    filename(request, file, cb) {
        const fileHash = crypto_1.default.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return cb(null, fileName);
    },
});
exports.default = {
    directory: tmpFolder,
    storage,
    limits: { fileSize: 1 * 1024 * 1024 },
};
