import { Router } from 'express';
import multer from 'multer';
import authorization from '../../../middlewares/authorization';
import uploadConfig from '../../../config/upload';
import DogsController from '../../../modules/Dogs/Infra/http/controllers/DogsController';

const dogsRouter = Router();
const upload = multer(uploadConfig);
const dogsController = new DogsController();
dogsRouter.use(authorization);
dogsRouter.patch(
  '/photo',
  upload.single('photo'),
  dogsController.update,
);

export default dogsRouter;
