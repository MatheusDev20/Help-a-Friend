/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
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
    return response.json(user);
  };

  public async read(request: Request, response: Response) {
    const readUsers = container.resolve(ReadAllUsers);

    const users = await readUsers.execute();

    users.map(((user) => {
      delete user.password;

      return user;
    }));
    response.json(users);
  }
}
export default UserController;
