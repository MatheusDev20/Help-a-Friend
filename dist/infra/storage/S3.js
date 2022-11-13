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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const buildPathS3_1 = __importDefault(require("./helpers/buildPathS3"));
const upload_1 = __importDefault(require("../../config/upload"));
class S3Storage {
    constructor() {
        this.s3Client = new aws_sdk_1.default.S3({
            region: 'us-east-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }
    uploadMultipleFiles(filenames, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = filenames.map((filename) => __awaiter(this, void 0, void 0, function* () {
                const originalPath = path_1.default.resolve(upload_1.default.directory, filename);
                const fileContent = yield fs_1.default.promises.readFile(originalPath);
                const ret = yield this.s3Client.putObject({
                    Bucket: process.env.BUCKET_NAME,
                    Key: (0, buildPathS3_1.default)(filename, resource),
                    ACL: 'public-read',
                    Body: fileContent,
                }).promise();
                return (0, buildPathS3_1.default)(filename, resource);
            }));
            const res = yield Promise.all(promises);
            return res;
        });
    }
    uploadFile(fileName, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalPath = path_1.default.resolve(upload_1.default.directory, fileName);
            const fileContent = yield fs_1.default.promises.readFile(originalPath);
            const ret = yield this.s3Client.putObject({
                Bucket: process.env.BUCKET_NAME,
                Key: (0, buildPathS3_1.default)(fileName, resource),
                ACL: 'public-read',
                Body: fileContent,
            }).promise();
            return (0, buildPathS3_1.default)(fileName, resource);
        });
    }
    listBuckets() {
        return __awaiter(this, void 0, void 0, function* () {
            const getBuckets = new Promise((resolve, reject) => {
                this.s3Client.listBuckets((err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            });
            return getBuckets;
        });
    }
}
exports.default = S3Storage;
