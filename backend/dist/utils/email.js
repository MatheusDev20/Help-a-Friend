"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailTemplate = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const getEmailTemplate = (type) => {
    switch (type) {
        case 'forgot-password':
            return handlebars_1.default.compile(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'templates', 'forgot-password.hbs'), 'utf-8'));
        default:
            throw new Error('Template not Found');
    }
};
exports.getEmailTemplate = getEmailTemplate;
