import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import EditUserUseCase from '../../../data/users/usecases/edit-user-usecase';

class EditUserController implements Controller {
  private readonly useCase: EditUserUseCase;

  constructor(useCase: EditUserUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;

    this.useCase.edit(email, name, password).then((user) => {
      const res = user;
      return response.json(res);
    }).catch((err) => response.json(err));

    return response.send('ok');
  }
}

export default EditUserController;
