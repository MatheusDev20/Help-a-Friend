import { Router } from 'express';
import userRoutes from './users';
import dogsRoute from './dogs/dogs.routes';
import sessionsRoute from './login/sessions.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/dogs', dogsRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
