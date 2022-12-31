import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import { ListPetsPerUser } from '../../../domain/pets/usecases';

export class GetUserPetsListController implements Controller {
  private readonly listPetsPerUser: ListPetsPerUser

  constructor(listPetsPerUser: ListPetsPerUser) {
    this.listPetsPerUser = listPetsPerUser;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const pets = await this.listPetsPerUser.list(request.user.id);
    return response.json(pets);
  }
}
