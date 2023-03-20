import { Pet } from '../models/pet';

export interface IGetPetInformation {
   byId(id: string): Promise<Pet>
}
