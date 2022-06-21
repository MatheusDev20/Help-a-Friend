import CreatePetDTO from '../pets/dto/create-dog-dto';
import Dog from '../../infra/db/postgres/entities/dogs';

interface Photo {
  imgId: string;
  url: string
}

export interface IPetsRepository {
  create(data: CreatePetDTO): Promise<Dog>
  findUserPets(user_id: string): Promise<Dog[]> | undefined;
  listAllUserPets(): Promise<Dog[]> | undefined;
  save(dog: Dog): Promise<Dog>;
  updatePetPhotos(dog: Dog, imgLinks: string[]): Promise<Photo[]>
}
