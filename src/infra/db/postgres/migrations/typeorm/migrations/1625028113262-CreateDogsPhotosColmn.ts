/* eslint-disable indent */

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateDogsPhotosColmn1625028113262 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('dogs', new TableColumn({
            name: 'photos',
            type: 'varchar',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('dogs', 'photos');
    }
}
