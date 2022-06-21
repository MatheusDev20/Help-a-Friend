import { Router, Request, Response } from 'express';
import * as factories from '../factories/users-factory';
import { Controller } from '../../presentation/protocols/controller';
import authMiddleware from '../../middlewares/authorization';

const adapt = (controller: Controller) => async (req: Request, res: Response) => {
  await controller.handle(req, res);
};
export default (router: Router): void => {
  router.post('/signup', adapt(factories.makeSignUpUserController()));
  router.delete('/delete', authMiddleware, adapt(factories.makeDeleteUserController()));
  router.post('/login', adapt(factories.makeAuthUserController()));
};
