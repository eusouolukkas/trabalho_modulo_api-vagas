import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaCandidatura1670015954434 implements MigrationInterface {
    name = 'CriarTabelaCandidatura1670015954434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vagas"."candidatura" ("id_candidato" character varying NOT NULL, "id_vaga" character varying NOT NULL, "id_sucesso" boolean NOT NULL, "dtCandidatura" TIMESTAMP NOT NULL, CONSTRAINT "PK_0a32fc2fe99e9cfc824b3e43cca" PRIMARY KEY ("id_candidato", "id_vaga"))`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" DROP CONSTRAINT "PK_8fc4878a1eec234441d6696c3cc"`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" ADD CONSTRAINT "PK_8fc4878a1eec234441d6696c3cc" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "vagas"."candidatura" ADD CONSTRAINT "FK_db83601857842a7e02b444ecfaa" FOREIGN KEY ("id_candidato") REFERENCES "vagas"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vagas"."candidatura" ADD CONSTRAINT "FK_4c44c1d870db92366bea2f0569f" FOREIGN KEY ("id_vaga") REFERENCES "vagas"."vaga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."candidatura" DROP CONSTRAINT "FK_4c44c1d870db92366bea2f0569f"`);
        await queryRunner.query(`ALTER TABLE "vagas"."candidatura" DROP CONSTRAINT "FK_db83601857842a7e02b444ecfaa"`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" DROP CONSTRAINT "PK_8fc4878a1eec234441d6696c3cc"`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" ADD CONSTRAINT "PK_8fc4878a1eec234441d6696c3cc" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "vagas"."candidatura"`);
    }

}
