import AppError from '../../../presentation/errors/AppError';
import { User } from '../../../domain/user/models/user';
import IUsersRepository from '../../protocols/user-repository';

class EditUserUseCase {
  private readonly repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public edit(email: string, name: string, password: string): Promise<User | AppError> {
    return new Promise((reject, resolve) => {
      console.log('?');
      this.repository.findByEmail(email).then((usr) => {
        if (!usr) {
          const err = new AppError('Unable to find user', 404);
          reject(err);
        }
        const newUser = {
          email,
          name,
          password,
          ...usr,
        };
        resolve(newUser);
        // Save
      });
    });
  }
}

export default EditUserUseCase;
