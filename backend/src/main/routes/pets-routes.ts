import { Router } from 'express';
import multer from 'multer';
import { body, query, param } from 'express-validator';
import authMiddleware from '../../middlewares/authorization';
import uploadConfig from '../../config/upload';
import routeAdapter from './adapters/route-adapter';
import {
  makeCreatePetController,
  makeUploadPetPhotosController,
  // makeListUserPetsController,
  makeListPetPageController,
  makeGetPetInformationController,
} from '../factories/pets-factory';

const upload = multer(uploadConfig);

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
    routeAdapter(makeCreatePetController()),
  );

  router.post('/pet/upload', authMiddleware, upload.array('photos', 4), routeAdapter(makeUploadPetPhotosController()));

  // router.get('/pet', adapter(makeListUserPetsController()));

  router.get(
    '/pet/list',
    query('page').notEmpty().isNumeric(),
    routeAdapter(makeListPetPageController()),
  );

  router.get(
    '/pet/:id',
    param('id').notEmpty(),
    routeAdapter(makeGetPetInformationController()),
  );
};
