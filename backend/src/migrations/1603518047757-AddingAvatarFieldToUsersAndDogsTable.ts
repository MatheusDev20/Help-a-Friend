import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddingAvatarFieldToUsersAndDogsTable1603518047757
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'avatar',
      type: 'varchar',
      isNullable: true,
    }));
    await queryRunner.addColumn('dogs', new TableColumn({
      name: 'avatar',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
    await queryRunner.dropColumn('dogs', 'avatar');
  }
}
