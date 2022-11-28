import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata";

export default new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: ["src/app/shared/entities/**/*.ts"],
  migrations: ["src/app/shared/migrations/**/*.ts"],
  schema: "aula",
});
