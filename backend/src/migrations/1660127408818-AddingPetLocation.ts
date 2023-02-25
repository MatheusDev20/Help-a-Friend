/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingPetLocation1660127408818 implements MigrationInterface {
    name = 'AddingPetLocation1660127408818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
        await queryRunner.query('ALTER TABLE "pets" ADD "city" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE "pets" ADD "uf" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE "pets" ADD "pet_location" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"');
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "petPreference" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "admin" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "pets" ALTER COLUMN "user_id" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "pets" ALTER COLUMN "pet_photos" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
        await queryRunner.query('ALTER TABLE "pets" ALTER COLUMN "pet_photos" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "pets" ALTER COLUMN "user_id" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false');
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "petPreference" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")');
        await queryRunner.query('ALTER TABLE "pets" DROP COLUMN "pet_location"');
        await queryRunner.query('ALTER TABLE "pets" DROP COLUMN "uf"');
        await queryRunner.query('ALTER TABLE "pets" DROP COLUMN "city"');
        await queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }
}
