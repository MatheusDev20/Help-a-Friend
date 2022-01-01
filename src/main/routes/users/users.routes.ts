import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../config/upload';
import authorization from '../../../middlewares/authorization';
import UpdateUserAvatarController from '../../../modules/User/Infra/http/controllers/UpdateUserAvatarController';

const userRouter = Router();
const upload = multer(uploadConfig);
const updateUserAvatar = new UpdateUserAvatarController();

userRouter.patch(
  '/avatar',
  authorization,
  upload.single('avatar'),
  updateUserAvatar.update,
);

export default userRouter;
