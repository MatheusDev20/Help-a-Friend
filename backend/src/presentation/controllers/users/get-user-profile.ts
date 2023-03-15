/* eslint-disable no-param-reassign */

import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import ReadAllUsersUseCase from '../../../data/users/usecases/get-user-profile';

class GetUserProfileController implements Controller {
  private readonly useCase: ReadAllUsersUseCase;

  constructor(useCase: ReadAllUsersUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const userProfile = await this.useCase.getProfile(request.user.id);
    return response.json(userProfile);
  }
}

export default GetUserProfileController;
