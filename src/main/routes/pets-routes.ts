import { Router, Request, Response } from 'express';
import multer from 'multer';
import { body, query } from 'express-validator';
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
    body('name').notEmpty(),
    body('gender').notEmpty().isLength({ max: 1 }),
    body('size').notEmpty(),
    body('history').notEmpty(),
    body('castrated').notEmpty().isBoolean(),
    body('vaccinated').notEmpty().isBoolean(),
    body('city').notEmpty(),
    body('uf').notEmpty(),
    body('specie').notEmpty(),
    authMiddleware,
    adapter(makeCreatePetController()),
  );
  router.post('/pet/upload', authMiddleware, upload.array('photos', 4), adapter(makeUploadPetPhotosController()));
  router.get('/pet', authMiddleware, adapter(makeListUserPetsController()));
  router.get('/pet/list',
    query('page').notEmpty().isNumeric(),
    adapter(makeListPetPageController()));
};
