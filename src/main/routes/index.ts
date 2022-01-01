import { Router } from 'express';
import usersRoute from './users/users.routes';
import dogsRoute from './dogs/dogs.routes';
import sessionsRoute from './login/sessions.routes';
import registerUserRouter from './users/register-user-route';
import readUsersRoute from './users/read-users-route';
import deleteUserRoute from './users/delete-users.route';

const routes = Router();

routes.use('/user', usersRoute);
routes.use('/signup', registerUserRouter);
routes.use('/list', readUsersRoute);
routes.use('/delete', deleteUserRoute);
routes.use('/dogs', dogsRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
