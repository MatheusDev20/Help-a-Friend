import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import { ListPetsPerUser } from '../../../domain/pets/usecases';
// Classe para lidar com a rota de listar todos os Pets cadastrados por um usuário.

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
