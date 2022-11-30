import { Request, Response, NextFunction } from "express";

export const createRecrutadorValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nome, username, senha, empresa } = req.body;

    if (!nome) {
      return res.status(400).send({
        ok: false,
        message: "Nome não informado!",
      });
    }

    if (!username) {
      return res.status(400).send({
        ok: false,
        message: "Username não informado!",
      });
    }

    if (!senha) {
      return res.status(400).send({
        ok: false,
        message: "Senha não informada!",
      });
    }

    if (!empresa) {
      return res.status(400).send({
        ok: false,
        message: "Empresa não informada!",
      });
    }

    next();
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
};
