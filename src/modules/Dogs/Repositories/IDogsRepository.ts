import CreateDogDTO from '@modules/Dogs/Dto/CreateDogDTO';
import Dog from '../Infra/typeorm/entities/Dogs';

interface IDogsRepository {
    create(data: CreateDogDTO): Promise<Dog>
    findUserDogs(user_id: string): Promise<Dog[]> | undefined;
    save(dog: Dog): Promise<Dog>;
}

export default IDogsRepository;
