import { inject, injectable } from 'tsyringe';
import AppError from '../../../errors/AppError';
import { User } from '../../../domain/user/models/user';
import IUsersRepositoriy from '../../protocols/user-repository';

@injectable()
class EditUserUseCase {
  constructor(@inject('UserRepository') private usersRepository: IUsersRepositoriy) { }

  public edit(email: string, name: string, password: string): Promise<User | AppError> {
    return new Promise((reject, resolve) => {
      console.log('?');
      this.usersRepository.findByEmail(email).then((usr) => {
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
