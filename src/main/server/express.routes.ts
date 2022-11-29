import { Router } from "express";

export const usuarioRoute = Router();

usuarioRoute.get("/", (req, res) => {
  return res.status(200).send({
    ok: true,
    message: "Tudo rodando normalmente!",
  });
});
