import { Router } from 'express';
import authorization from '../../../middlewares/authorization';
import ReadUsersController from '../../../presentation/controllers/users/read-users-controller';

const readUsersRoute = Router();

const readUsersController = new ReadUsersController();

readUsersRoute.get('/', authorization, readUsersController.handle);

export default readUsersRoute;
