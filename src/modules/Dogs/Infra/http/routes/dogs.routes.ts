import { Router } from 'express';
import multer from 'multer';
import authorization from '../../../../../middlewares/authorization';
import uploadConfig from '../../../../../config/upload';
import DogsController from '../controllers/DogsController';

const dogsRouter = Router();
const upload = multer(uploadConfig);
const dogsController = new DogsController();
dogsRouter.use(authorization);
dogsRouter.post('/', dogsController.create);
dogsRouter.patch(
  '/avatar',
  upload.single('avatar'),
  dogsController.update,
);

export default dogsRouter;
