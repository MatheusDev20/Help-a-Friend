import { Request, Response } from 'express';
import DeleteUserUseCase from '../../../data/users/usecases/delete-user-usecase';
import { Controller } from '../../protocols/controller';
import AppResponse from '../../../Models/Response';

class DeleteUserController implements Controller {
  private readonly useCase: DeleteUserUseCase;

  constructor(useCase: DeleteUserUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    console.log(request);
    const res = await this.useCase.delete(email, request.user.id);

    const payload = new AppResponse(200, res);
    return response.json(payload);
  }
}

export default DeleteUserController;
