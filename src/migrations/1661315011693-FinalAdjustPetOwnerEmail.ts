import {MigrationInterface, QueryRunner} from "typeorm";

export class FinalAdjustPetOwnerEmail1661315011693 implements MigrationInterface {
    name = 'FinalAdjustPetOwnerEmail1661315011693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_8892809a0f4ab3095225783b28c"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "user_email"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "pet_owner_email"`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "pet_owner_email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "pet_owner_email"`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "pet_owner_email" uuid`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "user_email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_8892809a0f4ab3095225783b28c" FOREIGN KEY ("pet_owner_email") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
