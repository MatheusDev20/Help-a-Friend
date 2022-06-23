import { Router, Request, Response } from 'express';
import multer from 'multer';
import * as factories from '../factories/users-factory';
import { Controller } from '../../presentation/protocols/controller';
import authMiddleware from '../../middlewares/authorization';
import uploadConfig from '../../config/upload';

const adapt = (controller: Controller) => async (req: Request, res: Response) => {
  await controller.handle(req, res);
};

const upload = multer(uploadConfig);
export default (router: Router): void => {
  router.post('/signup', adapt(factories.makeSignUpUserController()));
  router.delete('/delete', authMiddleware, adapt(factories.makeDeleteUserController()));
  router.post('/login', adapt(factories.makeAuthUserController()));
  router.post('/avatar', authMiddleware, upload.single('avatar'), adapt(factories.makeAvatarUpload()));
};
