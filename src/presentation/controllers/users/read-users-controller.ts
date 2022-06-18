/* eslint-disable no-param-reassign */

import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import ReadAllUsersUseCase from '../../../data/users/usecases/read-all-users-usecase';

class ReadUsersController implements Controller {
  private readonly useCase: ReadAllUsersUseCase

  constructor(useCase: ReadAllUsersUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const users = await this.useCase.read();

    users.map(((user) => {
      user.password = '';
      return user;
    }));

    return response.json(users);
  }
}

export default ReadUsersController;
