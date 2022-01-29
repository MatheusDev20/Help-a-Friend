/* eslint-disable indent */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterAvatarDogColumn1625026720895 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('dogs', 'avatar');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('dogs', new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
        }));
    }
}
