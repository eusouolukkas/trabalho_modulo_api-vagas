import { UserRepository } from "../../../../../src/app/features/user/repositories/user.repository";
import { VagaRepository } from "../../../../../src/app/features/vaga/repositories/vaga.repository";
import { CreateVagaUseCase } from "../../../../../src/app/features/vaga/usecase/create-vaga.usecase";
import { UsuarioModel } from "../../../../../src/app/models/usuario.model";
import { VagaModel } from "../../../../../src/app/models/vaga.model";
import { DataBaseConnection } from "../../../../../src/main/database/typeorm.connection";

interface SutTypes {
  userRepository: UserRepository;
  vagaRepository: VagaRepository;
  sut: CreateVagaUseCase;
}

const makeSut = () => {
  const userRepository = new UserRepository();
  const vagaRepository = new VagaRepository();
  const sut = new CreateVagaUseCase(userRepository, vagaRepository);

  return { userRepository, vagaRepository, sut };
};

describe("CreateVagaUseCase - ", () => {
  const createVagaDTO = {
    descricao: "description",
    empresa: "company",
    dtLimite: new Date(),
    indAtivo: true,
    idRecrutador: "id",
  };

  beforeAll(async () => {
    await DataBaseConnection.connect();
  });

  afterAll(async () => {
    await DataBaseConnection.connection.destroy();
  });

  test(" deve chamar o método get do userRepository com os valores corretos ", async () => {
    const { sut, userRepository } = makeSut();

    jest.spyOn(userRepository, "get").mockResolvedValue(null);
    const observer = jest.spyOn(userRepository, "get");

    await sut.execute(createVagaDTO);

    expect(observer).toBeCalledTimes(1);
    expect(observer).toBeCalledWith(createVagaDTO.idRecrutador);
  });

  test(" deve chamar o método get do vagaRepository com os valores corretos ", async () => {
    const usuarioModel = new UsuarioModel("name", "username", "pass", "type");
    const vagaModel = new VagaModel(
      createVagaDTO.descricao,
      createVagaDTO.empresa,
      createVagaDTO.dtLimite,
      createVagaDTO.indAtivo,
      usuarioModel
    );
    const { sut, userRepository, vagaRepository } = makeSut();

    jest.spyOn(userRepository, "get").mockResolvedValue(usuarioModel);
    jest.spyOn(vagaRepository, "create").mockResolvedValue(vagaModel);
    const observer = jest.spyOn(vagaRepository, "create");

    await sut.execute(createVagaDTO);

    expect(observer).toHaveBeenCalledTimes(1);
  });

  test("deve retornar null quando não encontra nenhum usuario com ", async () => {
    const { userRepository, sut } = makeSut();

    jest.spyOn(userRepository, "get").mockResolvedValue(null);

    const result = await sut.execute(createVagaDTO);

    expect(result).toEqual(null);
  });

  test(" deve retornar uma instância de vagaModel em Json, quando for possivel criar a vaga", async () => {
    const usuarioModel = new UsuarioModel("name", "username", "pass", "type");
    const vagaModel = new VagaModel(
      createVagaDTO.descricao,
      createVagaDTO.empresa,
      createVagaDTO.dtLimite,
      createVagaDTO.indAtivo,
      usuarioModel
    );
    const { sut, userRepository, vagaRepository } = makeSut();

    jest.spyOn(userRepository, "get").mockResolvedValue(usuarioModel);
    jest.spyOn(vagaRepository, "create").mockResolvedValue(vagaModel);

    const result = await sut.execute(createVagaDTO);

    expect(result).toEqual(vagaModel.toJson());
  });

  test("deve continuar o lançamento de um erro quando o mesmo for lançado por qualquer um dos repositorios", async () => {
    const { userRepository, sut } = makeSut();
    const error = new Error();

    jest.spyOn(userRepository, "get").mockRejectedValue(error);

    const result = sut.execute(createVagaDTO);

    await expect(result).rejects.toThrowError(new Error());
  });
});
