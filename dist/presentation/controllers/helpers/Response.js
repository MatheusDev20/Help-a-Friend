"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppResponse {
    constructor(statusCode = 100, data) {
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
