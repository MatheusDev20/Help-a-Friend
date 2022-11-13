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
const dotenv_1 = __importDefault(require("dotenv"));
const postgres_conn_helper_1 = require("../infra/db/helpers/postgres-conn-helper");
const app_1 = __importDefault(require("./config/app"));
const setup_routes_1 = __importDefault(require("./config/setup-routes"));
const error_1 = require("./middlewares/error");
dotenv_1.default.config();
app_1.default.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield postgres_conn_helper_1.postgresConnection;
    (0, setup_routes_1.default)(app_1.default);
    app_1.default.use(error_1.enableError);
    console.log(`App Running on PORT: ${process.env.PORT}`);
}));
