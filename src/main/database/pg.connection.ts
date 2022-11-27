import { DataSource } from "typeorm";
import "dotenv/config";

const config = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
