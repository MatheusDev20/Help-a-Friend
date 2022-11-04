import { Router, Request, Response } from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import { Controller } from '../../presentation/protocols/controller';
import authMiddleware from '../../middlewares/authorization';
import uploadConfig from '../../config/upload';
import {
  makeCreatePetController,
  makeUploadPetPhotosController,
  makeListUserPetsController,
  makeListPetPageController,
} from '../factories/pets-factory';

const upload = multer(uploadConfig);
const adapter = (controller: Controller) => async (req: Request, res: Response) => {
  await controller.handle(req, res);
};
export default (router: Router): void => {
  router.post(
    '/pet',
    body('name').isLength({ min: 5 }),
    authMiddleware,
    adapter(makeCreatePetController()),
  );
  router.post('/pet/upload', authMiddleware, upload.array('photos', 4), adapter(makeUploadPetPhotosController()));
  router.get('/pet', authMiddleware, adapter(makeListUserPetsController()));
  router.get('/pet/list', adapter(makeListPetPageController()));
};
