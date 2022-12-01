import { Request, Response, NextFunction } from "express";

export const createCandidatoValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nome, username, senha } = req.body;

    if (!nome) {
      return res.status(400).send({
        ok: false,
        message: "nome é obrigatório!",
      });
    }

    if (!username) {
      return res.status(400).send({
        ok: false,
        message: "username é obrigatório!",
      });
    }

    if (!senha) {
      return res.status(400).send({
        ok: false,
        message: "senha é obrigatória!",
      });
    }

    return next();
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
};
