"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableCors = void 0;
const enableCors = (req, res, next) => {
    res.set('access-control-allow-origin', 'https://haf-frontend-zeta.vercel.app');
    res.set('access-control-allow-methods', 'https://haf-frontend-zeta.vercel.app/');
    res.set('access-control-allow-headers', 'https://haf-frontend-zeta.vercel.app/');
    return next();
};
exports.enableCors = enableCors;
