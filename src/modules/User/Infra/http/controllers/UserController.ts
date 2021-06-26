/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import EditUser from '../../../Services/EditUser';
import AppResponse from '../../../../../Models/Response';
import DeleteUser from '../../../Services/DeleteUser';
import ReadAllUsers from '../../../Services/ReadAllUsers';
import CreateUserService from '../../../Services/CreateNewUser';

class UserController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    user.password = '';
    const payload = new AppResponse(200, user);
    return response.json(payload);
  };

  public async read(request: Request, response: Response): Promise<Response> {
    const readUsers = container.resolve(ReadAllUsers);

    const users = await readUsers.execute();

    users.map(((user) => {
      delete user.password;

      return user;
    }));
    return response.json(users);
  }

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
