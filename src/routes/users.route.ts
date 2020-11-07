import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateNewUser';
import userDataValidator from '../middlewares/userDataValidator';
import uploadConfig from '../config/upload';
import UpdateUserAvatar from '../services/UpdateUserAvatar';
import authorization from '../middlewares/authorization';

const userRouter = Router();
const upload = multer(uploadConfig);

// Create new User
userRouter.post('/', userDataValidator, async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });
  user.password = '';
  return res.json(user);
});

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
