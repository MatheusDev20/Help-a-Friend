import { Router } from 'express';

import registerUserRouter from './register-user-route';
import readUsersRoute from './read-users-route';
import deleteUserRoute from './delete-users.route';
import editUserRouter from './edit-user.route';
import updateUserAvatarRoute from './update-user-avatar.route';

const userRoutes = Router();

userRoutes.use('/signup', registerUserRouter);
userRoutes.use('/list', readUsersRoute);
userRoutes.use('/delete', deleteUserRoute);
userRoutes.use('/edit', editUserRouter);
userRoutes.use('/avatar', updateUserAvatarRoute);

export default userRoutes;
