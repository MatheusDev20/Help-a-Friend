import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { UploadDogImages } from '../../../domain/dogs/upload-dog-photos';
import IDogsRepository from '../../protocols/dogs-repository';
import AppError from '../../../errors/AppError';
import { Dog } from '../../../domain/dogs/models/dog';
import { Storage } from '../../protocols/storage';

interface Request {
  userId: string
  dogName: string,
  filename: string
}
@injectable()
class UploadDogImagesUseCase implements UploadDogImages {
  constructor(@inject('DogsRepository') private dogsRepository: IDogsRepository, @inject('Storage') private storageProvider: Storage) {
  }

  public async upload({ userId, dogName, filename }: Request): Promise<Dog> {
    // Query para achar todos os cachorros daquele usuario
    const dogs = await this.dogsRepository.findUserDogs(userId);
    if (!dogs) {
      throw new AppError('This user have no dogs registerd');
    }
    const selectedDog = dogs.find((dog) => dog.name === dogName);

    if (!selectedDog) {
      throw new AppError('Dog with this name was not Found');
    }
    const file = await this.storageProvider.uploadFile(filename, 'dogs');
    const existedPhotos = selectedDog.dog_photos;
    if (!existedPhotos) {
      const photos = [];

      const photo = {
        id: v4(),
        url: `${process.env.STORAGE_URL_PROD}/${file}`,
      };

      photos.push(photo);
      selectedDog.dog_photos = JSON.stringify(photos);
      this.dogsRepository.save(selectedDog);

      return selectedDog;
    }
    const photo = {
      id: v4(),
      url: `${process.env.STORAGE_URL_PROD}/${file}`,
    };
    const newPhotos = JSON.parse(existedPhotos);
    newPhotos.push(photo);

    selectedDog.dog_photos = JSON.stringify(newPhotos);

    this.dogsRepository.save(selectedDog);
    return selectedDog;
  }
}

export default UploadDogImagesUseCase;
