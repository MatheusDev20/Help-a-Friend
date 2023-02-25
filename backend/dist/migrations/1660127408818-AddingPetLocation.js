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
exports.AddingPetLocation1660127408818 = void 0;
class AddingPetLocation1660127408818 {
    constructor() {
        this.name = 'AddingPetLocation1660127408818';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
            yield queryRunner.query('ALTER TABLE "pets" ADD "city" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "pets" ADD "uf" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "pets" ADD "pet_location" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"');
            yield queryRunner.query('ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "users" ALTER COLUMN "petPreference" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "users" ALTER COLUMN "admin" DROP DEFAULT');
            yield queryRunner.query('ALTER TABLE "pets" ALTER COLUMN "user_id" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "pets" ALTER COLUMN "pet_photos" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
            yield queryRunner.query('ALTER TABLE "pets" ALTER COLUMN "pet_photos" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "pets" ALTER COLUMN "user_id" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false');
            yield queryRunner.query('ALTER TABLE "users" ALTER COLUMN "petPreference" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")');
            yield queryRunner.query('ALTER TABLE "pets" DROP COLUMN "pet_location"');
            yield queryRunner.query('ALTER TABLE "pets" DROP COLUMN "uf"');
            yield queryRunner.query('ALTER TABLE "pets" DROP COLUMN "city"');
            yield queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        });
    }
}
exports.AddingPetLocation1660127408818 = AddingPetLocation1660127408818;
