import { Router } from 'express';
import EditUserController from '../../../presentation/controllers/users/edit-user-controller';
import authorization from '../../../middlewares/authorization';

const editUserRouter = Router();

const editUserController = new EditUserController();

editUserRouter.put('/user', authorization, editUserController.handle);

export default editUserRouter;
