import cors from "cors";
import express from "express";
import { usuarioRoute } from "../server/express.routes";

export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/", usuarioRoute);

  return app;
};
