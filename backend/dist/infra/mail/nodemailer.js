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
exports.Nodemailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const utils_1 = require("../../utils");
const AppError_1 = __importDefault(require("../../presentation/errors/AppError"));
class Nodemailer {
    constructor() {
        nodemailer_1.default.createTestAccount().then((account) => {
            const transporter = nodemailer_1.default.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: process.env.ETHEREAL_MAIL_USER,
                    pass: process.env.ETHEREAL_MAIL_PASS,
                },
            });
            this.client = transporter;
        });
    }
    send(mailOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailConfig = {
                from: {
                    name: 'Equipe Help a Friend',
                    address: 'suport@helpafriend.com.br',
                },
                to: {
                    name: mailOptions.userName,
                    address: mailOptions.to,
                },
                subject: mailOptions.subject,
                html: (0, utils_1.getEmailTemplate)(mailOptions.type)(Object.assign({ userName: mailOptions.userName }, mailOptions.data)),
            };
            try {
                const { response, messageId } = yield this.client.sendMail(emailConfig);
                return {
                    response,
                    messageId,
                };
            }
            catch (err) {
                throw new AppError_1.default('Email could not be sent');
            }
        });
    }
}
exports.Nodemailer = Nodemailer;
