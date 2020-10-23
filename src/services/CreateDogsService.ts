import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import Dogs from '../models/Dogs.entity';

interface Request {
    name: string;
    gender: string;
    size: string;
    user_id: string;
    history: string;
    castrated: boolean;
    vaccinated: boolean
}
class CreateUserService {
  public async execute({
    name, gender, size, history, castrated, vaccinated, user_id,
  }: Request):Promise<Dogs> {
    const dogsRepository = getRepository(Dogs);

    const randomId = v4();
    const dog = dogsRepository.create({
      id: randomId,
      user_id,
      name,
      gender,
      size,
      history,
      castrated,
      vaccinated,
    });
    await dogsRepository.save(dog);
    return dog;
  }
}
export default CreateUserService;
