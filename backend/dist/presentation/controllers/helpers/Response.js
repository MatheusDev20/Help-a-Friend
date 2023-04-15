"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppResponse {
    constructor(data, statusCode = 100) {
        this.statusCode = statusCode;
        this.data = data;
    }
    formatResponse(data) {
        return {
            data,
        };
    }
}
exports.default = AppResponse;
