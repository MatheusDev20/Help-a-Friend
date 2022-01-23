import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatar from '../../../Services/UpdateUserAvatar';

class UpdateUserAvatarController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatar);
    console.log(request.file);
    if (!request.file) return response.json({ message: 'Filename is required' }).status(400);
    const user = await updateUserAvatar.execute(
      { id: request.user.id, filename: request.file.filename },
    );
    return response.json(user);
  };
}

export default UpdateUserAvatarController;
