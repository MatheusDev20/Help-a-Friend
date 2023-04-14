import { v4 } from 'uuid';
import { CreatePet } from '../../../domain/pets/usecases/create-pet-usecase';
import IUsersRepository from '../../protocols/repositorys/user-repository';
import { CreatePetDTO, CreatedDogResponse } from '../../../domain/pets/dtos/create-pet-dto';
import AppError from '../../../presentation/errors/AppError';
import { IPetsRepository } from '../../protocols/repositorys/pets-repository';

class CreatePetUseCase implements CreatePet {
  private readonly petRepository;

  private readonly userRepository;

  constructor(petRepository: IPetsRepository, userRepository: IUsersRepository) {
    this.petRepository = petRepository;
    this.userRepository = userRepository;
  }

  public async create({
    name, gender, size, history, castrated, vaccinated, user_id, city,
    uf, specie,
  }: CreatePetDTO): Promise<CreatedDogResponse> {
    const userInfo = await this.userRepository.findById(user_id);
    const pet_owner_email = userInfo?.email;

    const pets = await this.petRepository.findUserPets(user_id);
    if (pets) {
      if (pets.length > 4) {
        throw new AppError('User could not register more than 5 Dogs');
      }
    }
    const randomId = v4();
    const pet_location = `${city}, ${uf}`;

    const pet = await this.petRepository.create({
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
      pet_owner_email,
      specie,
    });

    return {
      id: pet.id,
      name: pet.name,
    };
  }
}
export default CreatePetUseCase;
