/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'presentation/protocols/controller';

import { Request, Response } from 'express';
import UploadDogsImagesUseCase from '../../../data/pets/usecases/update-dog-photos';
import AppError from '../../../errors/AppError';

export default class UpdatePetsPhotosController implements Controller {
  private readonly useCase: UploadDogsImagesUseCase

  constructor(useCase: UploadDogsImagesUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    if (!name) {
      throw new AppError('Please provide a dog name');
    }

    if (!request.files) {
      throw new AppError('At least one file is required');
    }
    const filenames: string[] = [];

    (request.files as Array<Express.Multer.File>).map((photo) => {
      filenames.push(photo.filename);
    });

    const uploadedPhotos = await this.useCase.upload({
      userId: request.user.id,
      petName: name as string,
      filenames,
    });

    return response.json(uploadedPhotos);
  }
}
