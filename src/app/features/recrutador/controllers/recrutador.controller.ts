import { Request, Response } from "express";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { CreateRecrutadorUseCase } from "../usecases/create-recrutador.usecase";
import { ListRecrutadorUseCase } from "../usecases/list-create.recrutrador.usecase";

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

  public async list(req: Request, res: Response) {
    try {
      const usecase = new ListRecrutadorUseCase(
        new UserRepository(),
        new CacheRepository()
      );
      const result = await usecase.execute();

      return res.status(200).send({
        ok: true,
        message: "Recrutadores listados com sucesso!",
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
