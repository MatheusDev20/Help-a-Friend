import { v4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import Dogs, { Gender } from '../Infra/typeorm/entities/Dogs';
import AppError from '../../../errors/AppError';

import IDogsRepository from '../Repositories/IDogsRepository';

interface Request {
    name: string;
    gender: Gender
    size: string;
    user_id: string;
    history: string;
    castrated: boolean;
    vaccinated: boolean
}
@injectable()
class CreateDogService {
  constructor(
    @inject('DogsRepository') private dogsRepository: IDogsRepository,
  ) {}

  public async execute({
    name, gender, size, history, castrated, vaccinated, user_id,
  }: Request):Promise<Dogs> {
    console.log(user_id); // Buscar infos na tabela de usuario
    const dogs = await this.dogsRepository.findUserDogs(user_id);

    if (dogs) {
      if (dogs.length > 4) {
        throw new AppError('User could not register more than 5 Dogs');
      }
    }
    const randomId = v4();
    const dog = this.dogsRepository.create({
      id: randomId,
      user_id,
      name,
      gender,
      size,
      history,
      castrated,
      vaccinated,
    });
    return dog;
  }
}
export default CreateDogService;
