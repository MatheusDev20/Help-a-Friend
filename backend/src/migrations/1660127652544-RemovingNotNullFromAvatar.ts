import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovingNotNullFromAvatar1660127652544 implements MigrationInterface {
  name = 'RemovingNotNullFromAvatar1660127652544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }
}
