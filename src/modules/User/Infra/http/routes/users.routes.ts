import { Router } from 'express';
import multer from 'multer';
import userDataValidator from '../../../../../middlewares/userDataValidator';
import UserController from '../controllers/UserController';
import uploadConfig from '../../../../../config/upload';
import UpdateUserAvatar from '../../../../../services/UpdateUserAvatar';
import authorization from '../../../../../middlewares/authorization';

const userRouter = Router();
const upload = multer(uploadConfig);
const userController = new UserController();
// Create new User
userRouter.post('/', userDataValidator, userController.create);
userRouter.patch(
  '/avatar',
  authorization,
  upload.single('avatar'),
  async (request, response) => {
    const updatedUserAvatar = new UpdateUserAvatar();
    const user = await updatedUserAvatar.execute(
      { id: request.user.id, filename: request.file.filename },
    );
    return response.json(user);
  },
);

export default userRouter;
