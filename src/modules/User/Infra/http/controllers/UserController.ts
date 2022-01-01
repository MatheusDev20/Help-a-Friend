/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import EditUser from '../../../Services/EditUser';
import AppResponse from '../../../../../Models/Response';
import DeleteUser from '../../../Services/DeleteUser';

class UserController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const deleteUser = container.resolve(DeleteUser);

    const res = await deleteUser.execute(email, request.user.id);
    const payload = new AppResponse(200, res);
    return response.json(payload);
  }

  public async edit(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;
    const editUser = container.resolve(EditUser);
    editUser.execute(email, name, password).then((user) => {
      const res = user;
      return response.json(res);
    }).catch((err) => response.json(err));

    return response.send('ok');
  }
}

export default UserController;
