import CreateDogDTO from '../dogs/dto/create-dog-dto';
import Dog from '../../infra/db/postgres/entities/dogs';

interface IDogsRepository {
  create(data: CreateDogDTO): Promise<Dog>
  findUserDogs(user_id: string): Promise<Dog[]> | undefined;
  listAllDogs(): Promise<Dog[]> | undefined;
  save(dog: Dog): Promise<Dog>;
}

export default IDogsRepository;
