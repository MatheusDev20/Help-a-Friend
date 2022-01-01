import { Router } from 'express';
import RegisterNewUserController from '../../../presentation/controllers/users/register-new-user-controller';
import userDataValidator from '../../../middlewares/userDataValidator';

const registerUserRouter = Router();

const registerUserController = new RegisterNewUserController();

registerUserRouter.post('/user', userDataValidator, registerUserController.handle);

export default registerUserRouter;
