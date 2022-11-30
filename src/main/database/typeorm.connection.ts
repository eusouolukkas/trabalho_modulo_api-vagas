import { DataSource } from "typeorm";
import "dotenv/config";
import typeormConfig from "../config/typeorm.config";

export class DataBaseConnection {
  private static _connection: DataSource;

  public static async connect() {
    //console.log(process.env.DB_URL);

    if (!this._connection) {
      this._connection = await typeormConfig.initialize();
    }

    console.log("Database inicializada!");
  }

  public static get connection() {
    if (!this._connection) {
      throw new Error("Database não foi inicializada!");
    }

    return this._connection;
  }
}
