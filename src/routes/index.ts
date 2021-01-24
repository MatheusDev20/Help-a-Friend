import { Router } from 'express';
import usersRoute from '../modules/User/Infra/http/routes/users.routes';
import dogsRoute from './dogs.routes';
import sessionsRoute from './sessions.route';

const routes = Router();

routes.use('/user', usersRoute);
routes.use('/dogs', dogsRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
