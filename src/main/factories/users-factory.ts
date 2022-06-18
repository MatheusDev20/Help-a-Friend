/* eslint-disable import/prefer-default-export */
import DeleteUserController from '../../presentation/controllers/users/delete-user-controller';
import DeleteUserUseCase from '../../data/users/usecases/delete-user-usecase';
import RegisterNewUserController from '../../presentation/controllers/users/register-new-user-controller';
import UserRepository from '../../infra/db/postgres/repositories/user-repository';
import CreateUserUseCase from '../../data/users/usecases/add-user-usecase';
import { Controller } from '../../presentation/protocols/controller';

const makeSignUpUserController = (): Controller => {
  const userRepository = new UserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const registerUserConroller = new RegisterNewUserController(createUserUseCase);
  return registerUserConroller;
};

const makeDeleteUserController = (): Controller => {
  const userRepository = new UserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const registerUserConroller = new DeleteUserController(deleteUserUseCase);
  return registerUserConroller;
};
export { makeSignUpUserController, makeDeleteUserController };
