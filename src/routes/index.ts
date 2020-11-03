import { Router } from 'express';
import usersRoute from './users.route';
import dogsRoute from './dogs.routes';
import sessionsRoute from './sessions.route';

const routes = Router();

routes.use('/user', usersRoute);
routes.use('/dogs', dogsRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
