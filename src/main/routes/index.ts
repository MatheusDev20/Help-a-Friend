import { Router } from 'express';
import userRoutes from './users';
// import dogsRoute from './dogs/dogs.routes';
import dogsRoutes from './dogs';
import sessionsRoute from './login/sessions.routes';

const routes = Router();
routes.use('/user', userRoutes);
routes.use('/dogs', dogsRoutes);
routes.use('/sessions', sessionsRoute);

export default routes;
