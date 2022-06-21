import { v4 } from 'uuid';
import Dogs from '../../../infra/db/postgres/entities/dogs';
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
}

class CreatePetUseCase {
  private readonly repository;

  constructor(repository: IPetsRepository) {
    this.repository = repository;
  }

  public async execute({
    name, gender, size, history, castrated, vaccinated, user_id,
  }: Request): Promise<Dogs> {
    console.log(user_id); // Buscar infos na tabela de usuario
    const pets = await this.repository.findUserPets(user_id);

    if (pets) {
      if (pets.length > 4) {
        throw new AppError('User could not register more than 5 Dogs');
      }
    }
    const randomId = v4();
    const pet = this.repository.create({
      id: randomId,
      user_id,
      name,
      gender,
      size,
      history,
      castrated,
      vaccinated,
    });
    return pet;
  }
}
export default CreatePetUseCase;
