"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresConnection = void 0;
const typeorm_1 = require("typeorm");
(0, typeorm_1.createConnection)();
const postgresConnection = new Promise((resolve, reject) => {
    try {
        console.log(process.env.DATABASE_URL);
        resolve((0, typeorm_1.createConnection)());
        console.log('Just to see');
    }
    catch (error) {
        reject(error);
    }
});
exports.postgresConnection = postgresConnection;
