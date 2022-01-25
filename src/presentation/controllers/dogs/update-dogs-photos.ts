import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UploadDogAvatarService from '../../../modules/Dogs/Services/UploadDogAvatar';
import AppError from '../../../errors/AppError';

export default class UpdateDogsPhotos {
  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const updateDogAvatar = container.resolve(UploadDogAvatarService);
    if (!request.file?.filename || !name) {
      throw new AppError('Filename is missing');
    }
    const dog = await updateDogAvatar.execute({
      userId: request.user.id,
      dogName: name as string,
      filename: request.file.filename,
    });
    return response.json(dog);
  }
}
