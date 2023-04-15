"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableCors = void 0;
const enableCors = (req, res, next) => {
    const allowedOrigins = ['https://haf-frontend-zeta.vercel.app', 'http://localhost:3000'];
    const { origin } = req.headers;
    if (origin) {
        if (allowedOrigins.includes(origin)) {
            res.set('access-control-allow-origin', origin);
            res.set('access-control-allow-methods', origin);
            res.set('access-control-allow-headers', origin);
        }
    }
    return next();
};
exports.enableCors = enableCors;
