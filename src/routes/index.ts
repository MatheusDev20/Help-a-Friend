import { Router } from 'express';
import usersRoute from './users.route';
import dogsRoute from './dogs.routes';

const routes = Router();

routes.use('/user', usersRoute);
routes.use('/dogs', dogsRoute);

export default routes;
