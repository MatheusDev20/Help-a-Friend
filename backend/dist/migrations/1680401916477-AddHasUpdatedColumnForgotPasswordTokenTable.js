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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddHasUpdatedColumnForgotPasswordTokenTable1680401916477 = void 0;
const typeorm_1 = require("typeorm");
class AddHasUpdatedColumnForgotPasswordTokenTable1680401916477 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumn('forgot_password_token', new typeorm_1.TableColumn({
                name: 'has_updated',
                type: 'bool',
                isNullable: true,
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('forgot_password_token', 'has_updated');
        });
    }
}
exports.AddHasUpdatedColumnForgotPasswordTokenTable1680401916477 = AddHasUpdatedColumnForgotPasswordTokenTable1680401916477;
