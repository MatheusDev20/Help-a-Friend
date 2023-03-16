import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatingForgotPasswordTokenTable1678938279257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'forgot_password_token',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_email',
            type: 'varchar',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'requested_at',
            type: 'timestamp',
            default: 'now()',
          },

        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('forgot_password_token');
  }
}
