import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllDogs from '../../../Services/ListAllDogs';

class ListDogsController {
  public async listAll(request: Request, response: Response): Promise<Response> {
    const listDogs = container.resolve(ListAllDogs);

    const allDogs = await listDogs.execute();
    console.log(allDogs);
    return response.json(allDogs);
  }
}

export default ListDogsController;
