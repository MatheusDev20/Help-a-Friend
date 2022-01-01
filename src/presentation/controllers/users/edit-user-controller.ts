import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Controller } from '../../protocols/controller';
import EditUser from '../../../modules/User/Services/EditUser';

class EditUserController implements Controller {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;
    const editUser = container.resolve(EditUser);
    editUser.execute(email, name, password).then((user) => {
      const res = user;
      return response.json(res);
    }).catch((err) => response.json(err));

    return response.send('ok');
  }
}

export default EditUserController;
