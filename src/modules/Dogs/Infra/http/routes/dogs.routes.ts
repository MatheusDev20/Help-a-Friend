import { Router } from 'express';
import multer from 'multer';
import authorization from '../../../../../middlewares/authorization';
import uploadConfig from '../../../../../config/upload';
import DogsController from '../controllers/DogsController';
import ListDogsController from '../controllers/ListDogsController';

const dogsRouter = Router();
const upload = multer(uploadConfig);
const dogsController = new DogsController();
const listDogsController = new ListDogsController();
dogsRouter.use(authorization);
dogsRouter.post('/', dogsController.create);
dogsRouter.get('/all', listDogsController.listAll);
dogsRouter.patch(
  '/photo',
  upload.single('photo'),
  dogsController.update,
);

export default dogsRouter;
