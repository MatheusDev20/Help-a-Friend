// import { PetInfo } from '../dtos';
import Pets from '../../../infra/db/postgres/entities/pets';

export interface IGetPetPage {
  getPage(page: string, filters: any): Promise<Pets[] | undefined>
}
