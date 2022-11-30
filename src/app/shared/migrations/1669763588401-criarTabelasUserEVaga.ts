import { MigrationInterface, QueryRunner } from "typeorm";

export class criarTabelasUserEVaga1669763588401 implements MigrationInterface {
    name = 'criarTabelasUserEVaga1669763588401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vagas"."usuario" ("id" character varying NOT NULL, "nome" character varying(60) NOT NULL, "username" character varying(60) NOT NULL, "senha" integer NOT NULL, "tipo" character varying(1) NOT NULL, "empresa" character varying(60), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6ccff37176a6978449a99c82e10" UNIQUE ("username"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vagas"."vaga" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying NOT NULL, "dtLimite" TIMESTAMP NOT NULL, "indAtivo" boolean NOT NULL, "maxCandidatos" integer NOT NULL, "id_recrutador" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8fc4878a1eec234441d6696c3cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" ADD CONSTRAINT "FK_f0d9366b1d9aa1f307cfdfdac6b" FOREIGN KEY ("id_recrutador") REFERENCES "vagas"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" DROP CONSTRAINT "FK_f0d9366b1d9aa1f307cfdfdac6b"`);
        await queryRunner.query(`DROP TABLE "vagas"."vaga"`);
        await queryRunner.query(`DROP TABLE "vagas"."usuario"`);
    }

}
