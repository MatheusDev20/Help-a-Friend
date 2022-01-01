import { Router } from 'express';
import EditUserController from '../../../presentation/controllers/users/edit-user-controller';
import authorization from '../../../middlewares/authorization';

const editUserRouter = Router();

const editUserController = new EditUserController();

editUserRouter.put('/', authorization, editUserController.handle);

export default editUserRouter;
