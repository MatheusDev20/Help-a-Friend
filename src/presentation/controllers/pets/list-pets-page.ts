import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import { IGetPetPage } from '../../../domain/pets/usecases/get-pet-page';

export class ListPetPage implements Controller {
  private readonly useCase;

  constructor(getPetPage: IGetPetPage) {
    this.useCase = getPetPage;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;

    const res = await this.useCase.getPage(String(page));

    return response.json(res);
  }
}
