import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { InvalidParamError } from '../../errors/InvalidParamsError';
import { Controller } from '../../protocols/controller';
import CreatePetUseCase from '../../../data/pets/usecases/create-pet-usecase';
import AppError from '../../errors/AppError';

export default class CreatePetsController implements Controller {
  private readonly useCase: CreatePetUseCase;

  constructor(useCase: CreatePetUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) throw new InvalidParamError(errors);

    const {
      name,
      gender,
      size,
      history,
      castrated,
      vaccinated,
      city,
      uf,
      specie,
    } = request.body;

    if (gender !== 'M' && gender !== 'F') {
      throw new AppError('Values M or F only supported by Gender');
    }

    const { id } = request.user;
    const pet = await this.useCase.create({
      name,
      gender,
      size,
      user_id: id,
      history,
      castrated,
      vaccinated,
      city,
      uf,
      specie,

    });

    return response.json(pet);
  }
}
