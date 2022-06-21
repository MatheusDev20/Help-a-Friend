/* eslint-disable import/prefer-default-export */
import AuthorizationUseCase from '../../data/users/usecases/auth-user-usecase';
import AuthController from '../../presentation/controllers/auth/auth-user-controller';
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

const makeAuthUserController = (): Controller => {
  const usersRepository = new UserRepository();
  const authorizationUseCase = new AuthorizationUseCase(usersRepository);
  const authController = new AuthController(authorizationUseCase);
  return authController;
};

export { makeSignUpUserController, makeDeleteUserController, makeAuthUserController };
