"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fileName, resource) => {
    const date = new Date();
    return `${resource}/${date.getFullYear()}/${date.getMonth() + 1}/${fileName}`;
};
