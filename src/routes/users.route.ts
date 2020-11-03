import { Router } from 'express';
import CreateUserService from '../services/CreateNewUser';
import userDataValidator from '../middlewares/userDataValidator';

const userRouter = Router();

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

export default userRouter;
