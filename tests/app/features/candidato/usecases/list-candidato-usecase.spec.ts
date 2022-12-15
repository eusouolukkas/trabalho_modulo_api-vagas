import { ListCandidatoUseCase } from "../../../../../src/app/features/candidato/usecase/list-create-candidato.usecase";
import { UserRepository } from "../../../../../src/app/features/user/repositories/user.repository";
import { UsuarioModel } from "../../../../../src/app/models/usuario.model";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { CacheConnection } from "../../../../../src/main/database/cache.connection";
import { DataBaseConnection } from "../../../../../src/main/database/typeorm.connection";

interface SutTypes {
  repository: UserRepository;
  cacheRepository: CacheRepository;
  sut: ListCandidatoUseCase;
}

const makeSut = (): SutTypes => {
  const cacheRepository = new CacheRepository();
  const repository = new UserRepository();
  const sut = new ListCandidatoUseCase(repository, cacheRepository);
  return { sut, repository, cacheRepository };
};

describe("ListCandidatoUseCase -", () => {
  beforeAll(async () => {
    await DataBaseConnection.connect();
    await CacheConnection.connect();
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await DataBaseConnection.connection.destroy();
    await CacheConnection.connection.quit();
  });

  test("deve chamar o método find do repositório do UserRepository com os valores corretos", async () => {
    const { sut, repository, cacheRepository } = makeSut();

    jest.spyOn(cacheRepository, "get").mockResolvedValue(null);

    jest.spyOn(repository, "find").mockResolvedValue([]);
    const observer = jest.spyOn(repository, "find");

    await sut.execute();

    expect(observer).toHaveBeenCalledTimes(1);
    expect(observer).toHaveBeenCalledWith("C");
  });

  test("deve retornar uma lista com instâncias de UsuarioModel convertida em Json", async () => {
    const usuarioModel = new UsuarioModel("name", "username", "pass", "type");
    const expected = [usuarioModel.toJson()];

    const { sut, repository, cacheRepository } = makeSut();

    jest.spyOn(cacheRepository, "get").mockResolvedValue(null);

    jest.spyOn(repository, "find").mockResolvedValue([usuarioModel]);

    const result = await sut.execute();

    expect(result).toEqual(expected);
  });
});
