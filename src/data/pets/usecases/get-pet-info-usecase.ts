// import { PetInfo } from '../../../domain/pets/dtos/pet-info-dto';
import { IPetsRepository } from '../../protocols/pets-repository';
import { IGetPetInformation } from '../../../domain/pets/usecases/get-pet-information';

export class GetPetInfoUseCase implements IGetPetInformation {
    private repository: IPetsRepository

    constructor(repository: IPetsRepository) {
      this.repository = repository;
    }

    async byId(id: string): Promise<any> {
      const response = await this.repository.findByID(id);
      console.log(response);

      return response;
    }
}
