import { Router, Request, Response } from 'express';
import multer from 'multer';
import { Controller } from '../../presentation/protocols/controller';
import authMiddleware from '../../middlewares/authorization';
import uploadConfig from '../../config/upload';
import {
  makeCreatePetController,
  makeUploadPetPhotosController,
  makeListPetsController,
} from '../factories/pets-factory';

const upload = multer(uploadConfig);
const adapter = (controller: Controller) => async (req: Request, res: Response) => {
  await controller.handle(req, res);
};
export default (router: Router): void => {
  router.post('/pet', authMiddleware, adapter(makeCreatePetController()));
  router.post('/pet/upload', authMiddleware, upload.array('photos', 2), adapter(makeUploadPetPhotosController()));
  router.get('/pet', authMiddleware, adapter(makeListPetsController()));
};
