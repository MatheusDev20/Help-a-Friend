import { Request, Response } from 'express';
import { Controller } from '../../protocols/controller';
import UpdateUserAvatarUseCase from '../../../data/users/usecases/update-user-avatar-usecase';

class UpdateUserAvatarController implements Controller {
  private readonly useCase: UpdateUserAvatarUseCase;

  constructor(useCase: UpdateUserAvatarUseCase) {
    this.useCase = useCase;
  }

  public async handle(
    request: Request,
    response: Response,
  ): Promise<Response> {
    if (!request.file) return response.json({ message: 'Filename is required' }).status(400);

    const user = await this.useCase.update(
      { id: request.user.id, filename: request.file.filename },
    );
    return response.json(user);
  };
}

export default UpdateUserAvatarController;
