import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovingNotNullFromPetPhotos1660128004423 implements MigrationInterface {
    name = 'RemovingNotNullFromPetPhotos1660128004423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"`);
        await queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "pet_photos" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"`);
        await queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "pet_photos" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
