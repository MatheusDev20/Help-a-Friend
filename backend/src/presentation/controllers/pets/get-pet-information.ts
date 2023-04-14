import { Request, Response } from 'express';
import { IGetPetById } from '../../../domain/pets/usecases/get-pet-by-id';

export class GetPetInformation {
  private readonly getPetInfo: IGetPetById;

  constructor(getPetInfo: IGetPetById) {
    this.getPetInfo = getPetInfo;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const pet = await this.getPetInfo.byId(id);
    return response.json(pet);
  }
}
