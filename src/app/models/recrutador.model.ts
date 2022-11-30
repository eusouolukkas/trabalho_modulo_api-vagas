import { UsuarioModel } from "./usuario.model";

export class RecrutadorModel extends UsuarioModel {
  constructor(nome: string, username: string, senha: string, empresa: string) {
    super(nome, username, senha, "R", empresa);
  }
}
