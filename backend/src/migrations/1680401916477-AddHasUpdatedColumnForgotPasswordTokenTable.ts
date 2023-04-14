/* eslint-disable max-len */
import {
  MigrationInterface, QueryRunner, TableColumn,
} from 'typeorm';

export class AddHasUpdatedColumnForgotPasswordTokenTable1680401916477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('forgot_password_token', new TableColumn({
      name: 'has_updated',
      type: 'bool',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('forgot_password_token', 'has_updated');
  }
}
