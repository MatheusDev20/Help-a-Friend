/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Pets from '../../../infra/db/postgres/entities/pets';
import { IPetsRepository } from '../../protocols/pets-repository';
import { IGetPetPage } from '../../../domain/pets/usecases/get-pet-page';

export class GetPetPage implements IGetPetPage {
  private readonly repository;

  constructor(repository: IPetsRepository) {
    this.repository = repository;
  }

  public async getPage(page: string, filters: any): Promise<Pets[] | undefined> {
    const dbResponse = this.repository.getPage(page, filters);
    return dbResponse;
  }
}
