/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';
import CreateDogDTO from '../../../../data/pets/dto/create-dog-dto';
import { IPetsRepository } from '../../../../data/protocols/pets-repository';
import Dogs from '../entities/dogs';

interface Photo {
  imgId: string;
  url: string
}

class PetsRepository implements IPetsRepository {
  private dogsRepository: Repository<Dogs> // Declarando o atributo do orm da classe

  constructor() {
    this.dogsRepository = getRepository(Dogs);
  }

  public async create(data: CreateDogDTO): Promise<Dogs> {
    const dog = this.dogsRepository.create(data);

    await this.dogsRepository.save(dog);
    return dog;
  }

  public async findUserPets(user_id: string): Promise<Dogs[]> {
    const dogs = await this.dogsRepository.find({ where: { user_id } });

    return dogs;
  }

  public async listAllUserPets(): Promise<Dogs[]> {
    const allDogs = await this.dogsRepository
      .createQueryBuilder('dogs')
      .getMany();

    return allDogs;
  }

  public async save(dog: Dogs): Promise<Dogs> {
    return this.dogsRepository.save(dog);
  }

  public async updatePetPhotos(pet: Dogs, imgLinks: string[]): Promise<Photo[]> {
    if (pet.dog_photos) {
      const photos: Photo[] = JSON.parse(pet.dog_photos);

      imgLinks.forEach((img) => {
        photos.push({
          imgId: v4(),
          url: `${process.env.STORAGE_URL_PROD}/${img}`,
        });
      });
      pet.dog_photos = JSON.stringify(photos);
      await this.dogsRepository.save(pet);

      return photos;
      // Caso ainda não tenha fotos
    }
    const photos: Photo[] = [];
    imgLinks.forEach((img) => {
      photos.push({
        imgId: v4(),
        url: `${process.env.STORAGE_URL_PROD}/${img}`,
      });
    });
    pet.dog_photos = JSON.stringify(photos);
    await this.dogsRepository.save(pet);

    return photos;
  }
}

export default PetsRepository;
