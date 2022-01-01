import { Router } from 'express';
import ReadUsersController from '../../../presentation/controllers/users/read-users-controller';

const readUsersRoute = Router();

const readUsersController = new ReadUsersController();

readUsersRoute.get('/', readUsersController.handle);

export default readUsersRoute;
