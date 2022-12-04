import { Request, Response } from "express";
import { AplicarVagaUseCase } from "../usecase/aplicar-vaga.usecase";
import { CreateVagaUseCase } from "../usecase/create-vaga.usecase";

export class VagaController {
  public async create(req: Request, res: Response) {
    try {
      const {
        descricao,
        empresa,
        dtLimite,
        indAtivo,
        maxCandidatos,
        idRecrutador,
      } = req.body;

      const usecase = new CreateVagaUseCase();
      const result = await usecase.execute({
        descricao,
        empresa,
        dtLimite,
        indAtivo,
        maxCandidatos,
        idRecrutador,
      });

      if (!result) {
        res.status(404).send({
          ok: false,
          message: " O recrutador não existe!",
        });
      }

      return res.status(201).send({
        ok: true,
        message: "Vaga criada com sucesso!",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async apply(req: Request, res: Response) {
    try {
      const { idCandidato, indSucesso } = req.body;
      const { idVaga } = req.params;

      const usecase = new AplicarVagaUseCase();
      const result = await usecase.execute({
        idCandidato,
        idVaga,
        indSucesso,
      });

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "usuario/vaga não encontrado(a)!",
        });
      }

      return res.status(201).send({
        ok: true,
        message: "candidatura realizada com sucesso!",
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
