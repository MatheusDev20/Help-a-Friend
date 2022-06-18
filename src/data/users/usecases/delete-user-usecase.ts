import AppError from '../../../errors/AppError';
import IUsersRepository from '../../protocols/user-repository';
import { DeleteUser } from '../../../domain/user/usecases/delete-user';

interface DeletedUser {
  name: string;
  email: string;
  msg: string;
}

class DeleteUserUseCase implements DeleteUser {
  private readonly repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async delete(email: string, loggedId: string): Promise<DeletedUser> {
    const userToBeDeleted = await this.repository.findByEmail(email);
    const loggedUser = await this.repository.findById(loggedId);

    if (!userToBeDeleted) {
      throw new AppError('User not founded', 404);
    }

    if (loggedUser?.email === userToBeDeleted.email) {
      throw new AppError('Cannot deleted current logged user', 400);
    }
    const deletedUser = await this.repository.delete(userToBeDeleted);

    const payload = {
      name: deletedUser.name,
      email: deletedUser.email,
      msg: 'User sucesfully deleted',
    };

    return payload;
  }
}
export default DeleteUserUseCase;
