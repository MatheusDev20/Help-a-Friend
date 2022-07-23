/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';
import CreatePetDTO from '../../../../data/pets/dto/create-dog-dto';
import { IPetsRepository } from '../../../../data/protocols/pets-repository';
import Pets from '../entities/pets';

interface Photo {
  imgId: string;
  url: string
}

class PetsRepository implements IPetsRepository {
  private petsRepository: Repository<Pets> // Declarando o atributo do orm da classe

  constructor() {
    this.petsRepository = getRepository(Pets);
  }

  public async create(data: CreatePetDTO): Promise<Pets> {
    const dog = this.petsRepository.create(data);

    await this.petsRepository.save(dog);
    return dog;
  }

  public async findUserPets(user_id: string): Promise<Pets[]> {
    const pets = await this.petsRepository.find({ where: { user_id } });
    console.log(pets);
    return pets;
  }

  public async listAllUserPets(): Promise<Pets[]> {
    const allDogs = await this.petsRepository
      .createQueryBuilder('pets')
      .getMany();

    return allDogs;
  }

  public async save(pet: Pets): Promise<Pets> {
    return this.petsRepository.save(pet);
  }

  public async updatePetPhotos(pet: Pets, imgLinks: string[]): Promise<Photo[]> {
    if (pet.pet_photos) {
      const photos: Photo[] = JSON.parse(pet.pet_photos);

      imgLinks.forEach((img) => {
        photos.push({
          imgId: v4(),
          url: `${process.env.STORAGE_URL_PROD}/${img}`,
        });
      });
      pet.pet_photos = JSON.stringify(photos);
      await this.petsRepository.save(pet);

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
    pet.pet_photos = JSON.stringify(photos);
    await this.petsRepository.save(pet);
    return photos;
  }
}

export default PetsRepository;
