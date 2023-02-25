import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { InvalidParamError } from '../../errors/InvalidParamsError';
import { Controller } from '../../protocols/controller';
import { IGetPetPage } from '../../../domain/pets/usecases/get-pet-page';

export class ListPetPage implements Controller {
  private readonly useCase;

  constructor(getPetPage: IGetPetPage) {
    this.useCase = getPetPage;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);
    if (!errors.isEmpty()) throw new InvalidParamError(errors);

    const {
      page, size, gender, specie,
    } = request.query;

    const filters = { size, gender, specie };
    const res = await this.useCase.getPage(page as string, filters);

    return response.json(res);
  }
}
