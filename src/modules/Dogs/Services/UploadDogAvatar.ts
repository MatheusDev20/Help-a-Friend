import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import IDogsRepository from '../Repositories/IDogsRepository';
import AppError from '../../../errors/AppError';
import Dog from '../Infra/typeorm/entities/Dogs';
import uploadConfig from '../../../config/upload';

interface Request {
  userId: string
  dogName: string,
  filename: string
}
@injectable()
class UploadDogAvatar {
  constructor(@inject('DogsRepository') private dogsRepository: IDogsRepository) {
  }

  public async execute({ userId, dogName, filename }: Request): Promise<Dog> {
    // Query para achar todos os cachorros daquele usuario
    const dogs = await this.dogsRepository.findUserDogs(userId);
    if (!dogs) {
      throw new AppError('This user have no dogs registerd');
    }
    const selectedDog = dogs.find((dog) => dog.name === dogName);

    if (!selectedDog) {
      throw new AppError('Dog with this name was not Found');
    }
    if (selectedDog.avatar) {
      const DogAvatarFilePath = path.join(
        uploadConfig.directory,
        selectedDog.avatar,
      );
      const dogAvatarFileExists = await fs.promises.stat(
        DogAvatarFilePath,
      );
      if (dogAvatarFileExists) {
        await fs.promises.unlink(DogAvatarFilePath);
      }
    }
    selectedDog.avatar = filename;
    this.dogsRepository.save(selectedDog);
    return selectedDog;
  }
}

export default UploadDogAvatar;
