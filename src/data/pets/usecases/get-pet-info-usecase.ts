// import { PetInfo } from '../../../domain/pets/dtos/pet-info-dto';
import Pets from '../../../infra/db/postgres/entities/pets';
import { IPetsRepository } from '../../protocols/pets-repository';
import { IGetPetInformation } from '../../../domain/pets/usecases/get-pet-information';

export class GetPetInfoUseCase implements IGetPetInformation {
    private repository: IPetsRepository

    constructor(repository: IPetsRepository) {
      this.repository = repository;
    }

    async byId(id: string): Promise<Pets> {
      const response = await this.repository.findByID(id);

      return response;
    }
}
