import { Pet } from '../models/pet';

export interface IGetPetById {
   byId(id: string): Promise<Pet>
}
