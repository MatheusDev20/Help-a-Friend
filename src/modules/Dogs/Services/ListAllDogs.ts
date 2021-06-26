import { inject, injectable } from 'tsyringe';
import AppError from '../../../errors/AppError';
import Dogs from '../Infra/typeorm/entities/Dogs';
import IDogsRepository from '../Repositories/IDogsRepository';

@injectable()
class ListAllDogs {
  constructor(@inject('DogsRepository') private dogsRepository: IDogsRepository) { }

  public async execute(): Promise<Dogs[]> {
    const listOfDogs = await this.dogsRepository.listAllDogs();
    if (!listOfDogs) {
      throw new AppError('Not dog founded');
    }
    return listOfDogs;
  }
}

export default ListAllDogs;
