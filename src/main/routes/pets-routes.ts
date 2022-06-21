import { Router, Request, Response } from 'express';
import multer from 'multer';
import { makePetController, makeUploadPetPhotosController } from '../factories/pets-factory';
import { Controller } from '../../presentation/protocols/controller';
import authMiddleware from '../../middlewares/authorization';
import uploadConfig from '../../config/upload';

const upload = multer(uploadConfig);
const adapter = (controller: Controller) => async (req: Request, res: Response) => {
  await controller.handle(req, res);
};
export default (router: Router): void => {
  router.post('/pet', authMiddleware, adapter(makePetController()));
  router.post('/pet/upload', authMiddleware, upload.array('photos', 2), adapter(makeUploadPetPhotosController()));
};
