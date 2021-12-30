import { Router } from 'express';
import usersRoute from './users/users.routes';
import dogsRoute from './dogs/dogs.routes';
import sessionsRoute from './login/sessions.routes';

const routes = Router();

routes.use('/user', usersRoute);
routes.use('/dogs', dogsRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
