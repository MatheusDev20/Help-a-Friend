import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UploadDogAvatarService from '../../../modules/Dogs/Services/UploadDogAvatar';
import AppError from '../../../errors/AppError';
import CreateDogService from '../../../modules/Dogs/Services/CreateDogsService';

export default class DogsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, gender, size, history, castrated, vaccinated,
    } = request.body;
    const createDog = container.resolve(CreateDogService);
    if (gender !== 'M' && gender !== 'F') {
      throw new AppError('Values M or F only supported by Gender');
    }
    const { id } = request.user;
    const dog = await createDog.execute({
      name, gender, size, user_id: id, history, castrated, vaccinated,
    });
    return response.json(dog);
  }

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
