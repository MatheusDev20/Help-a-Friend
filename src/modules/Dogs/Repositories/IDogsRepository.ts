import CreateDogDTO from '@modules/Dogs/Dto/CreateDogDTO';
import Dog from '../Infra/typeorm/entities/Dogs';

interface IDogsRepository {
    create(data: CreateDogDTO): Promise<Dog>
    findDog(user_id: string): Promise<Dog[]> | undefined
}

export default IDogsRepository;
