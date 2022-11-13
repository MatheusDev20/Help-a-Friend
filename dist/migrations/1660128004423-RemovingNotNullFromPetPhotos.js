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
exports.RemovingNotNullFromPetPhotos1660128004423 = void 0;
class RemovingNotNullFromPetPhotos1660128004423 {
    constructor() {
        this.name = 'RemovingNotNullFromPetPhotos1660128004423';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"`);
            yield queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "pet_photos" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"`);
            yield queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "pet_photos" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.RemovingNotNullFromPetPhotos1660128004423 = RemovingNotNullFromPetPhotos1660128004423;
