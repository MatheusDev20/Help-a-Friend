import { Router, Request, Response } from 'express';
import multer from 'multer';
import { body, query } from 'express-validator';
import * as factories from '../factories/users-factory';
import { Controller } from '../../presentation/protocols/controller';
import authMiddleware from '../../middlewares/authorization';
import uploadConfig from '../../config/storage/upload';

const adapt = (controller: Controller) => async (req: Request, res: Response) => {
  await controller.handle(req, res);
};

const upload = multer(uploadConfig);
export default (router: Router): void => {
  router.post(
    '/signup',
    body('name').notEmpty().isLength({ max: 24 }),
    body('password').notEmpty().isLength({ min: 8 }),
    body('email').notEmpty().isEmail(),
    body('petPreference').notEmpty(),
    adapt(factories.makeSignUpUserController()),
  );

  router.delete(
    '/user/delete',
    authMiddleware,
    adapt(factories.makeDeleteUserController()),
  );

  router.post(
    '/login',
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 8 }),
    adapt(factories.makeAuthUserController()),
  );

  router.post('/avatar', authMiddleware, upload.single('avatar'), adapt(factories.makeAvatarUpload()));
  router.get('/getProfile', authMiddleware, adapt(factories.makeUserProfile()));

  // Reset Password Routes
  router.post('/forgot-password', query('email').notEmpty().isEmail(), adapt(factories.makeForgotPasswordController()));
  router.post('/reset-password', adapt(factories.makeResetPasswordController()));
};
