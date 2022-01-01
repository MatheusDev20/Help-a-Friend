/* eslint-disable no-param-reassign */
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import ReadAllUsers from '../../../modules/User/Services/ReadAllUsers';

class ReadUsersController implements Controller {
  public async handle(request: Request, response: Response): Promise<Response> {
    const readUsers = container.resolve(ReadAllUsers);

    const users = await readUsers.execute();

    users.map(((user) => {
      delete user.password;

      return user;
    }));
    return response.json(users);
  }
}

export default ReadUsersController;
