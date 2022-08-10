/* eslint-disable indent */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateingArrayPhotosColumn1625282232133 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('dogs', new TableColumn({
            name: 'photos',
            type: 'varchar',
            isArray: true,
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('dogs', 'photos');
    }
}
