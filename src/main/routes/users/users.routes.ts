import { Router } from 'express';
import multer from 'multer';
import UserController from '../../../modules/User/Infra/http/controllers/UserController';
import uploadConfig from '../../../config/upload';
import authorization from '../../../middlewares/authorization';
import UpdateUserAvatarController from '../../../modules/User/Infra/http/controllers/UpdateUserAvatarController';

const userRouter = Router();
const upload = multer(uploadConfig);
const userController = new UserController();
const updateUserAvatar = new UpdateUserAvatarController();

userRouter.patch(
  '/avatar',
  authorization,
  upload.single('avatar'),
  updateUserAvatar.update,
);

userRouter.delete('/', authorization, userController.delete);

userRouter.put('/', authorization, userController.edit);

export default userRouter;
