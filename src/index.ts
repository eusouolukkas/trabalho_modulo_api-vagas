import { DataBaseConnection } from "./main/database/typeorm.connection";
import { runServer } from "./main/server/express.server";

//appRoutes(app);

DataBaseConnection.connect().then(() => {
  runServer();
});
