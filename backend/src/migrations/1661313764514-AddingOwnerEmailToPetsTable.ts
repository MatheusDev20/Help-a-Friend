/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingOwnerEmailToPetsTable1661313764514 implements MigrationInterface {
    name = 'AddingOwnerEmailToPetsTable1661313764514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "pets" ADD "pet_owner_email" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE "pets" ADD "email" uuid');
        await queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
        await queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_89acb2d13c42a8bfb245183f77e" FOREIGN KEY ("email") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_89acb2d13c42a8bfb245183f77e"');
        await queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
        await queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "pets" DROP COLUMN "email"');
        await queryRunner.query('ALTER TABLE "pets" DROP COLUMN "pet_owner_email"');
    }
}
