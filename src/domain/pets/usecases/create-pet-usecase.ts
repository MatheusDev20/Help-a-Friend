import { CreatedDogResponse, CreatePetDTO } from '../dtos/create-pet-dto';

export interface CreatePet {
  create: (data: CreatePetDTO) => Promise<CreatedDogResponse>
}
