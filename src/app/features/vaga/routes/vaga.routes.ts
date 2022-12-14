import { Router } from "express";
import { checkLoginCandidatoMiddleware } from "../../candidato/middlewares/check-login-candidato";
import { checkLoginMiddleware } from "../../login/middleware/check-login.middleware";
import { checkLoginRecrutadorMiddleware } from "../../recrutador/middleware/check-login-recrutador.middleware";
import { VagaController } from "../controllers/vaga.controller";
import { createVagaValidator } from "../validators/create-vaga.validator";

export const vagaRoutes = () => {
  const router = Router();

  router.post(
    "/",
    [checkLoginMiddleware, checkLoginRecrutadorMiddleware, createVagaValidator],
    new VagaController().create
  );

  router.post(
    "/apply/:idVaga",
    [checkLoginMiddleware, checkLoginCandidatoMiddleware],
    new VagaController().apply
  );

  return router;
};
