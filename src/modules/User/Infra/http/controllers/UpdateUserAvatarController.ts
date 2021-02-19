import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatar from '../../../Services/UpdateUserAvatar';

class UpdateUserAvatarController {
  public async update(
    request: Request,
    response:Response,
  ):Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatar);
    const user = await updateUserAvatar.execute(
      { id: request.user.id, filename: request.file.filename },
    );
    return response.json(user);
  };
}
export default UpdateUserAvatarController;
