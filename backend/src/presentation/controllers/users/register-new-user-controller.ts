import { v4 } from 'uuid';
import { Request, Response } from 'express';
import { Controller } from 'presentation/protocols/controller';
import { validationResult } from 'express-validator';
import { CreateNewUser } from '../../../domain/user/usecases/create-new-user';
import { InvalidParamError } from '../../errors/InvalidParamsError';
import AppResponse from '../helpers/Response';

class RegisterNewUserController implements Controller {
  private readonly useCase: CreateNewUser;

  constructor(useCase: CreateNewUser) {
    this.useCase = useCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const validateEntry = validationResult(request);
    if (!validateEntry.isEmpty()) throw new InvalidParamError(validateEntry);

    const {
      name, email, password, petPreference,
    } = request.body;

    const user = await this.useCase.create({
      id: v4(),
      name,
      email,
      password,
      petPreference,
      admin: false,
    });
    const payload = new AppResponse(user, 200);
    return response.json(payload);
  }
}

export default RegisterNewUserController;
