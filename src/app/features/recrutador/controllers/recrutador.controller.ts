import { Request, Response } from "express";
import { CreateRecrutadorUseCase } from "../usecases/create-recrutador.usecase";

export class RecrutadorController {
  public async create(req: Request, res: Response) {
    try {
      const { nome, username, senha, empresa } = req.body;

      const usecase = new CreateRecrutadorUseCase();
      const result = await usecase.execute({
        nome,
        username: username,
        senha,
        empresa,
      });

      return res.status(200).send({
        ok: true,
        message: "Recrutador criado com sucesso",
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
