import { PetInfo } from '../dtos/pet-info-dto';

export interface ListPetsPerUser {
  list: (userId: string) => Promise<PetInfo[] | undefined>
}
