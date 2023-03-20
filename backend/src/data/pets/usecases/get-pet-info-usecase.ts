import { Pet } from '../../../domain/pets/models/pet';
import { IPetsRepository } from '../../protocols/pets-repository';
import { IGetPetById } from '../../../domain/pets/usecases/get-pet-by-id';

export class GetPetByIdUseCase implements IGetPetById {
  private repository: IPetsRepository;

  constructor(repository: IPetsRepository) {
    this.repository = repository;
  }

  async byId(id: string): Promise<Pet> {
    const response = await this.repository.findByID(id);

    return response;
  }
}
