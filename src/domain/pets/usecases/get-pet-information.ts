import Pets from '../../../infra/db/postgres/entities/pets';

export interface IGetPetInformation {
   byId(id: string): Promise<Pets>
}
