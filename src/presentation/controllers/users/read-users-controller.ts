/* eslint-disable no-param-reassign */
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import ReadAllUsersUseCase from '../../../data/users/usecases/read-all-users-usecase';

class ReadUsersController implements Controller {
  public async handle(request: Request, response: Response): Promise<Response> {
    const useCase = container.resolve(ReadAllUsersUseCase);
    const users = await useCase.read();

    users.map(((user) => {
      user.password = '';
      return user;
    }));

    return response.json(users);
  }
}

export default ReadUsersController;
