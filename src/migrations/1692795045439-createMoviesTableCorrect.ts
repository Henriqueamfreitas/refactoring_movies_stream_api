import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoviesTableCorrect1692795045439 implements MigrationInterface {
    name = 'CreateMoviesTableCorrect1692795045439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "description" SET NOT NULL`);
    }

}
