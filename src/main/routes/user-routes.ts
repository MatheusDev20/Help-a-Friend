import { Router, Request, Response } from 'express';
import { makeDeleteUserController, makeSignUpUserController } from '../factories/users-factory';
import { Controller } from '../../presentation/protocols/controller';
import authMiddleware from '../../middlewares/authorization';

const adapt = (controller: Controller) => async (req: Request, res: Response) => {
  await controller.handle(req, res);
};

export default (router: Router): void => {
  router.post('/signup', adapt(makeSignUpUserController()));
  router.delete('/users/delete', authMiddleware, adapt(makeDeleteUserController()));
};
