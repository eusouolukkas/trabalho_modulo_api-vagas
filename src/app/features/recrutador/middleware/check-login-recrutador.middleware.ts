import { NextFunction, Request, Response } from "express";
import { JwtHelper } from "../../../shared/util/jwt.helper";

export const checkLoginRecrutadorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userHeader = req.headers["user"];

    if (!userHeader) {
      return res.status(401).send({
        ok: false,
        message: "Token não informado, faça o seu login!",
      });
    }

    const user = JSON.parse(userHeader.toString());

    if (user !== "R") {
      return res.status(403).send({
        ok: false,
        message: "usuário deve ser recrutador",
      });
    }

    return next();
  } catch (error: any) {
    return res.status(401).send({
      ok: false,
      message: "Token inválido, faça o seu login!",
    });
  }
};
