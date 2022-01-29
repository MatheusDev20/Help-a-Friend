import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UploadDogsImagesUseCase from '../../../data/dogs/usecases/update-dog-photos-usecase';
import AppError from '../../../errors/AppError';

export default class UpdateDogsPhotos {
  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const updateDogAvatar = container.resolve(UploadDogsImagesUseCase);
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
