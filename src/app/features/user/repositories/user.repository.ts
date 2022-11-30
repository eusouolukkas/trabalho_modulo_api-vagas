import { DataBaseConnection } from "../../../../main/database/typeorm.connection";
import { UsuarioModel } from "../../../models/usuario.model";
import { UserEntity } from "../../../shared/entities/user.entity";

export class UserRepository {
  private _repository = DataBaseConnection.connection.getRepository(UserEntity);

  public async create(user: UsuarioModel) {
    const userEntity = this._repository.create({
      id: user.id,
      empresa: user.empresa,
      nome: user.nome,
      senha: user.senha,
      tipo: user.tipo,
      username: user.username,
    });

    const result = await this._repository.save(userEntity);

    return this.mapEntityToModel(result);
  }

  public async findByUsernamePassword(username: string, senha: string) {
    const result = await this._repository.findOneBy({
      username,
      senha,
    });

    if (!result) {
      return null;
    }
    return this.mapEntityToModel(result);
  }

  private mapEntityToModel(userEntity: UserEntity) {
    const user = UsuarioModel.create(
      userEntity.id,
      userEntity.nome,
      userEntity.username,
      userEntity.tipo,
      userEntity.senha,
      userEntity.empresa
    );

    return user;
  }
}
