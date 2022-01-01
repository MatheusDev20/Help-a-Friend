import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteUser from '../../../modules/User/Services/DeleteUser';
import { Controller } from '../../protocols/controller';
import AppResponse from '../../../Models/Response';

class DeleteUserController implements Controller {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const deleteUser = container.resolve(DeleteUser);

    const res = await deleteUser.execute(email, request.user.id);

    const payload = new AppResponse(200, res);
    return response.json(payload);
  }
}

export default DeleteUserController;
