import { MigrationInterface, QueryRunner } from "typeorm";

export class alterarSenha1669765295937 implements MigrationInterface {
    name = 'alterarSenha1669765295937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" ADD "senha" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" ADD "senha" integer NOT NULL`);
    }

}
