import { PetInfo } from '../dtos/pet-info-dto';

export interface IGetPetInformation {
   byId(id: string): Promise<PetInfo>
}
