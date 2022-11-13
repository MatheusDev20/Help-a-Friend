"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const upload_1 = __importDefault(require("../../config/upload"));
exports.default = (app) => {
    app.use('/files', express_1.default.static(upload_1.default.directory));
    app.use(middlewares_1.jsonParser);
    app.use(middlewares_1.enableCors);
};
