import { Router, Request, Response } from "express";
import { checkLoginMiddleware } from "../../login/middleware/check-login.middleware";
import { RecrutadorController } from "../controllers/recrutador.controller";
import { checkLoginRecrutadorMiddleware } from "../middleware/check-login-recrutador.middleware";
import { createRecrutadorValidator } from "../validators/create-recrutador.validator";

export const recrutadorRoutes = () => {
  const router = Router();

  router.post(
    "/",
    [createRecrutadorValidator],
    new RecrutadorController().create
  );

  router.post(
    "/vaga",
    [checkLoginMiddleware, checkLoginRecrutadorMiddleware],
    (req: Request, res: Response) => {
      return res.send({
        ok: true,
        message: "Vaga criada!",
      });
    }
  );

  return router;
};
