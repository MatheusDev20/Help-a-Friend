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
const typeorm_1 = require("typeorm");
class CreateDogTable1602910772748 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'dogs',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'gender',
                        type: 'varchar',
                    },
                    {
                        name: 'size',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'history',
                        type: 'varchar',
                    },
                    {
                        name: 'castrated',
                        type: 'boolean',
                    },
                    {
                        name: 'vaccinated',
                        type: 'boolean',
                    },
                ],
            }));
            yield queryRunner.createForeignKey('dogs', new typeorm_1.TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('dogs');
        });
    }
}
exports.default = CreateDogTable1602910772748;
