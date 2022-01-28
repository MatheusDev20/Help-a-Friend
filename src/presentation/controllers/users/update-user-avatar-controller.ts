import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarUseCase from '../../../data/users/usecases/update-user-avatar-usecase';

class UpdateUserAvatarController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const useCase = container.resolve(UpdateUserAvatarUseCase);
    console.log(request.file);
    if (!request.file) return response.json({ message: 'Filename is required' }).status(400);
    const user = await useCase.update(
      { id: request.user.id, filename: request.file.filename },
    );
    return response.json(user);
  };
}

export default UpdateUserAvatarController;
