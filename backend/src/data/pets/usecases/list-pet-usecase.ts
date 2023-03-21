import { PetInfo } from '../../../domain/pets/dtos/pet-info-dto';
import { IPetsRepository } from '../../protocols/repositorys/pets-repository';
import { ListPetsPerUser } from '../../../domain/pets/usecases/list-pets-user';

export class ListPetsPerUseCase implements ListPetsPerUser {
  private readonly repository;

  constructor(repository: IPetsRepository) {
    this.repository = repository;
  }

  public async list(user_id: string): Promise<PetInfo[] | undefined> {
    const pets = await this.repository.findUserPets(user_id);

    const petsInfo = pets?.map((pet) => ({
      name: pet.name,
      gender: pet.gender,
      user_id: pet.user_id,
      history: pet.history,
      castrated: pet.castrated,
      vaccinated: pet.vaccinated,
      pet_photos: pet.pet_photos,
      pet_location: pet.pet_location,
    }));

    return petsInfo;
  }
}
