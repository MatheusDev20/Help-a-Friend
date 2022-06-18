/* eslint-disable no-restricted-syntax */

import { Request, Response } from 'express';
import UploadDogsImagesUseCase from '../../../data/dogs/usecases/update-dog-photos-usecase';
import AppError from '../../../errors/AppError';

export default class UpdateDogsPhotos {
  private readonly useCase: UploadDogsImagesUseCase

  constructor(useCase: UploadDogsImagesUseCase) {
    this.useCase = useCase;
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    if (!name) {
      throw new AppError('Please provide a dog name');
    }

    if (!request.file) {
      throw new AppError('File is required');
    }

    const filename = request.file?.filename;

    const dog = await this.useCase.upload({
      userId: request.user.id,
      dogName: name as string,
      filename,
    });

    return response.json(dog);
  }
}
