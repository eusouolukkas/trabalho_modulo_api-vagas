import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../../user/repositories/user.repository";

export class ListCandidatoUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute() {
    const cachedList = await this.cacheRepository.get("Candidato");

    if (cachedList) {
      return {
        cache: true,
        data: cachedList,
      };
    }

    const result = await this.repository.find("C");
    const resultJson = result.map((item) => item.toJson());
    await this.cacheRepository.set("Candidato", resultJson);

    return resultJson;
  }
}
