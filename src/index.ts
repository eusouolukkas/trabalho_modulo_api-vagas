import { CacheConnection } from "./main/database/cache.connection";
import { DataBaseConnection } from "./main/database/typeorm.connection";
import { runServer } from "./main/server/express.server";

Promise.all([DataBaseConnection.connect(), CacheConnection.connect()]).then(
  () => {
    runServer();
  }
);
