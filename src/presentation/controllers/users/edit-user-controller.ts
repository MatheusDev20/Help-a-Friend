import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Controller } from '../../protocols/controller';
import EditUserUseCase from '../../../data/users/usecases/edit-user-usecase';

class EditUserController implements Controller {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;
    const useCase = container.resolve(EditUserUseCase);

    useCase.edit(email, name, password).then((user) => {
      const res = user;
      return response.json(res);
    }).catch((err) => response.json(err));

    return response.send('ok');
  }
}

export default EditUserController;
