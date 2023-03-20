import { Pet } from '../../../domain/pets/models/pet';
import { IPetsRepository } from '../../protocols/pets-repository';
import { IGetPetInformation } from '../../../domain/pets/usecases/get-pet-information';

export class GetPetInfoUseCase implements IGetPetInformation {
  private repository: IPetsRepository;

  constructor(repository: IPetsRepository) {
    this.repository = repository;
  }

  async byId(id: string): Promise<Pet> {
    const response = await this.repository.findByID(id);

    return response;
  }
}
