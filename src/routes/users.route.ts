import { Router } from 'express';
import CreateUserService from '../services/CreateNewUser';

const userRouter = Router();

// Create new User
userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    user.password = '';
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default userRouter;
