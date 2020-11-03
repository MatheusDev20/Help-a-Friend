import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import AppError from '../errors/AppError';
import Dog from '../models/Dogs.entity';
import uploadConfig from '../config/upload';

interface Request {
    id: string
    dogName: string,
    filename: string
}

class UploadDogAvatar {
  public async execute({ id, dogName, filename }: Request): Promise<Dog> {
    const dogsRepository = getRepository(Dog);
    // Query para achar todos os cachorros daquele usuario
    const dogs = await dogsRepository.find({ where: { user_id: id } });
    const selectedDog = dogs.find((dog) => dog.name === dogName);
    console.log(selectedDog);
    if (!selectedDog) {
      throw new AppError('Dog not Found');
    }
    if (selectedDog.avatar) {
      const DogAvatarFilePath = path.join(
        uploadConfig.directory,
        selectedDog.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(
        DogAvatarFilePath,
      );
      if (userAvatarFileExists) {
        await fs.promises.unlink(DogAvatarFilePath);
      }
    }
    selectedDog.avatar = filename;
    dogsRepository.save(selectedDog);
    return selectedDog;
  }
}

export default UploadDogAvatar;
