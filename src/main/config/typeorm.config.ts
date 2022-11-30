import { DataSource } from "typeorm";
import "reflect-metadata";
import { appEnv } from "../../app/envs/app.env";

export default new DataSource({
  type: "postgres",
  url: appEnv.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: ["src/app/shared/entities/**/*.ts"],
  migrations: ["src/app/shared/migrations/**/*.ts"],
  schema: "vagas",
});
