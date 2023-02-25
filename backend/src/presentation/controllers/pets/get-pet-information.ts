import { Request, Response } from 'express';
import { IGetPetInformation } from '../../../domain/pets/usecases/get-pet-information';

export class GetPetInformation {
  private readonly getPetInfo: IGetPetInformation

  constructor(getPetInfo: IGetPetInformation) {
    this.getPetInfo = getPetInfo;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const pet = await this.getPetInfo.byId(id);
    return response.json(pet);
  }
}
