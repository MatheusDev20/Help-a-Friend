import { Request, Response } from 'express';
import CreateDogUseCase from '../../../data/dogs/usecases/create-dog-usecase';
import AppError from '../../../errors/AppError';

export default class DogsController {
  private readonly useCase: CreateDogUseCase;

  constructor(useCase: CreateDogUseCase) {
    this.useCase = useCase;
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, gender, size, history, castrated, vaccinated,
    } = request.body;

    if (gender !== 'M' && gender !== 'F') {
      throw new AppError('Values M or F only supported by Gender');
    }

    const { id } = request.user;
    const dog = await this.useCase.execute({
      name, gender, size, user_id: id, history, castrated, vaccinated,
    });

    return response.json(dog);
  }
}
