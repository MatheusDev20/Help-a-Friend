import { Request, Response } from 'express';
import AppError from '../../../errors/AppError';
import { Controller } from '../../protocols/controller';
import { IGetPetPage } from '../../../domain/pets/usecases/get-pet-page';

export class ListPetPage implements Controller {
  private readonly useCase;

  constructor(getPetPage: IGetPetPage) {
    this.useCase = getPetPage;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      page, size, gender, specie,
    } = request.query;
    const filters = {
      size: size as string,
      gender: gender as string,
      specie: specie as string,
    };

    if (!page) {
      throw new AppError('Parameter missing: page');
    }

    const res = await this.useCase.getPage(page as string, filters);

    return response.json(res);
  }
}
