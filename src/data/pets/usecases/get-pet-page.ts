import Pets from '../../../infra/db/postgres/entities/pets';
import { IPetsRepository } from '../../protocols/pets-repository';
// import { PetInfo } from '../../../domain/pets/dtos';
import { IGetPetPage } from '../../../domain/pets/usecases/get-pet-page';

export class GetPetPage implements IGetPetPage {
  private readonly repository;

  constructor(repository: IPetsRepository) {
    this.repository = repository;
  }

  public async getPage(page: string): Promise<Pets[]> {
    const dbResponse = this.repository.getPage(page);
    return dbResponse;
  }
}
