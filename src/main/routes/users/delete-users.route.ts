import { Router } from 'express';
import authorization from '../../../middlewares/authorization';
import DeleteUserController from '../../../presentation/controllers/users/delete-user-controller';

const deleteUserRoute = Router();

const deleteUserController = new DeleteUserController();

deleteUserRoute.delete('/', authorization, deleteUserController.handle);

export default deleteUserRoute;
