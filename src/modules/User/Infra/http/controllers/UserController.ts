import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../Services/CreateNewUser';

class UserController {
  public async create(
    request: Request,
    response:Response,
  ):Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    user.password = '';
    return response.json(user);
  };
}
export default UserController;
