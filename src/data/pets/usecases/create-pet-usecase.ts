import { v4 } from 'uuid';
import Pets from '../../../infra/db/postgres/entities/pets';
import AppError from '../../../errors/AppError';

import { IPetsRepository } from '../../protocols/pets-repository';

interface Request {
  name: string;
  gender: string;
  size: string;
  user_id: string;
  history: string;
  castrated: boolean;
  vaccinated: boolean
  city: string
  uf: string
}

class CreatePetUseCase {
  private readonly repository;

  constructor(repository: IPetsRepository) {
    this.repository = repository;
  }

  public async createPet({
    name, gender, size, history, castrated, vaccinated, user_id, city,
    uf,
  }: Request): Promise<Pets> {
    const pets = await this.repository.findUserPets(user_id);
    if (pets) {
      if (pets.length > 4) {
        throw new AppError('User could not register more than 5 Dogs');
      }
    }
    const randomId = v4();
    const pet_location = `${city},${uf}`;
    const pet = this.repository.create({
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
    return pet;
  }
}
export default CreatePetUseCase;
