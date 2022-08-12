import { v4 } from 'uuid';
import { CreatePetDTO, CreatedDogResponse } from '../../../domain/pets/dtos/create-pet-dto';
import AppError from '../../../errors/AppError';
import { CreatePet } from '../../../domain/pets/usecases';
import { IPetsRepository } from '../../protocols/pets-repository';

class CreatePetUseCase implements CreatePet {
  private readonly repository;

  constructor(repository: IPetsRepository) {
    this.repository = repository;
  }

  public async create({
    name, gender, size, history, castrated, vaccinated, user_id, city,
    uf,
  }: CreatePetDTO): Promise<CreatedDogResponse> {
    const pets = await this.repository.findUserPets(user_id);
    if (pets) {
      if (pets.length > 4) {
        throw new AppError('User could not register more than 5 Dogs');
      }
    }
    const randomId = v4();
    const pet_location = `${city},${uf}`;

    const pet = await this.repository.create({
      id: randomId,
      user_id,
      name,
      gender,
      size,
      history,
      castrated,
      vaccinated,
      city,
      uf,
      pet_location,
    });

    return {
      id: pet.id,
      name: pet.name,
    };
  }
}
export default CreatePetUseCase;
