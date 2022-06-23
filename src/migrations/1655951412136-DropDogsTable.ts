/* eslint-disable indent */
import {
    MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class DropDogsTable1655951412136 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('dogs');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'dogs',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'gender',
                    type: 'varchar',
                },
                {
                    name: 'size',
                    type: 'varchar',
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'history',
                    type: 'varchar',
                },
                {
                    name: 'castrated',
                    type: 'boolean',
                },
                {
                    name: 'vaccinated',
                    type: 'boolean',
                },
                {
                    name: 'dog_photos',
                    type: 'varchar',
                    isNullable: true,
                },
            ],
        }));
        await queryRunner.createForeignKey('dogs', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
    }
}
