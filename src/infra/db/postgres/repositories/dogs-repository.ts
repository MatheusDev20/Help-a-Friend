import { getRepository, Repository } from 'typeorm';
import CreateDogDTO from '../../../../data/dogs/dto/create-dog-dto';
import IDogsRepository from '../../../../data/protocols/dogs-repository';
import Dogs from '../entities/dogs';

class DogsRepository implements IDogsRepository {
  private dogsRepository: Repository<Dogs> // Declarando o atributo do orm da classe

  constructor() {
    this.dogsRepository = getRepository(Dogs);
  }

  public async create(data: CreateDogDTO): Promise<Dogs> {
    const dog = this.dogsRepository.create(data);

    await this.dogsRepository.save(dog);
    return dog;
  }

  public async findUserDogs(user_id: string): Promise<Dogs[]> {
    const dogs = await this.dogsRepository.find({ where: { user_id } });

    return dogs;
  }

  public async listAllDogs(): Promise<Dogs[]> {
    const allDogs = await this.dogsRepository
      .createQueryBuilder('dogs')
      .getMany();
    console.log(allDogs);

    return allDogs;
  }

  public async save(dog: Dogs): Promise<Dogs> {
    return this.dogsRepository.save(dog);
  }
}

export default DogsRepository;
