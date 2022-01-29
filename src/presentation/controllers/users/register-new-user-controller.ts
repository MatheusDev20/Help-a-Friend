import { Request, Response } from 'express';
import { Controller } from 'presentation/protocols/controller';
import { container } from 'tsyringe';
import CreateUserUseCase from '../../../data/users/usecases/add-user-usecase';
import AppResponse from '../../../Models/Response';
// import CreateUserService from '../../../modules/User/Services/CreateNewUser';

class RegisterNewUserController implements Controller {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserUseCase);

    const user = await createUser.add({
      name,
      email,
      password,
    });

    user.password = '';
    const payload = new AppResponse(200, user);
    return response.json(payload);
  }
}

export default RegisterNewUserController;
