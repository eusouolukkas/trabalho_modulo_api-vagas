import { Request, Response } from "express";
import { CreateCandidatoUseCase } from "../usecase/create-candidato.usecase";

export class CandidatoController {
  public async create(req: Request, res: Response) {
    try {
      const { nome, username, senha } = req.body;

      const usecase = new CreateCandidatoUseCase();
      const result = await usecase.execute({
        nome,
        username,
        senha,
      });

      return res.status(201).send({
        ok: true,
        message: "Candidato criado com sucesso",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
