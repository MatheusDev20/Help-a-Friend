import { Router } from 'express';
import multer from 'multer';
import userDataValidator from '../../../../../middlewares/userDataValidator';
import UserController from '../controllers/UserController';
import uploadConfig from '../../../../../config/upload';
import authorization from '../../../../../middlewares/authorization';
import UpdateUserAvatarController from '../controllers/UpdateUserAvatarController';

const userRouter = Router();
const upload = multer(uploadConfig);
const userController = new UserController();
const updateUserAvatar = new UpdateUserAvatarController();
// Create new User
userRouter.post('/', userDataValidator, userController.create);
userRouter.patch(
  '/avatar',
  authorization,
  upload.single('avatar'),
  updateUserAvatar.update,
);

export default userRouter;
