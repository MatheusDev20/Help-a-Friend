import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import Dogs from '../Infra/typeorm/entities/Dogs';
import AppError from '../../../errors/AppError';

interface Request {
    name: string;
    gender: string;
    size: string;
    user_id: string;
    history: string;
    castrated: boolean;
    vaccinated: boolean
}
class CreateDogService {
  public async execute({
    name, gender, size, history, castrated, vaccinated, user_id,
  }: Request):Promise<Dogs> {
    console.log(user_id); // Buscar infos na tabela de usuario
    const dogsRepository = getRepository(Dogs);
    const dogs = await dogsRepository.find({ where: { user_id } });
    if (dogs.length > 4) {
      throw new AppError('User could not register more than 5 Dogs');
    }
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
export default CreateDogService;
