import { inject, injectable } from 'tsyringe';
import AppError from '../../../errors/AppError';
import Users from '../Infra/typeorm/entities/User';
import IUsersRepositoriy from '../Repositories/IUsersRepositoriy';

@injectable()
class EditUser {
  constructor(@inject('UserRepository') private usersRepository: IUsersRepositoriy) { }

  public execute(email: string, name: string, password: string): Promise<Users | AppError> {
    return new Promise((reject, resolve) => {
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

export default EditUser;
