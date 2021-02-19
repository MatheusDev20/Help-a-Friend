import { Router } from 'express';
import usersRoute from '../modules/User/Infra/http/routes/users.routes';
import dogsRoute from '../modules/Dogs/Infra/http/routes/dogs.routes';
import sessionsRoute from '../modules/User/Infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/user', usersRoute);
routes.use('/dogs', dogsRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
