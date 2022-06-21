import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import CreatePetUseCase from '../../../data/pets/usecases/create-pet-usecase';
import AppError from '../../../errors/AppError';

export default class CreatePetsController implements Controller {
  private readonly useCase: CreatePetUseCase;

  constructor(useCase: CreatePetUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      name, gender, size, history, castrated, vaccinated,
    } = request.body;

    if (gender !== 'M' && gender !== 'F') {
      throw new AppError('Values M or F only supported by Gender');
    }

    const { id } = request.user;
    const pet = await this.useCase.execute({
      name, gender, size, user_id: id, history, castrated, vaccinated,
    });

    return response.json(pet);
  }
}
