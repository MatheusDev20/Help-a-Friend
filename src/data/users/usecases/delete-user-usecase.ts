import { inject, injectable } from 'tsyringe';
import AppError from '../../../errors/AppError';
import IUsersRepositoriy from '../../protocols/user-repository';

interface DeletedUser {
  name: string;
  email: string;
  msg: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(@inject('UserRepository') private userRepository: IUsersRepositoriy) { }

  public async delete(email: string, loggedId: string): Promise<DeletedUser> {
    const userToBeDeleted = await this.userRepository.findByEmail(email);
    const loggedUser = await this.userRepository.findById(loggedId);

    if (!userToBeDeleted) {
      throw new AppError('User not founded', 404);
    }

    if (loggedUser?.email === userToBeDeleted.email) {
      throw new AppError('Cannot deleted current logged user', 400);
    }
    const deletedUser = await this.userRepository.delete(userToBeDeleted);

    const payload = {
      name: deletedUser.name,
      email: deletedUser.email,
      msg: 'User sucesfully deleted',
    };

    return payload;
  }
}
export default DeleteUserUseCase;
