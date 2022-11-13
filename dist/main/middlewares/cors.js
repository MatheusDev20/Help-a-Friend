"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableCors = void 0;
const enableCors = (req, res, next) => {
    res.set('access-control-allow-origin', '*');
    res.set('access-control-allow-methods', '*');
    res.set('access-control-allow-headers', '*');
    return next();
};
exports.enableCors = enableCors;
