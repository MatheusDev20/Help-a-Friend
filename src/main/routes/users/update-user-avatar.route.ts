import { Router } from 'express';
import multer from 'multer';
import UpdateUserAvatarController from '../../../presentation/controllers/users/update-user-avatar-controller';
import authorization from '../../../middlewares/authorization';
import uploadConfig from '../../../config/upload';

const updateUserAvatarRoute = Router();
const updateUserController = new UpdateUserAvatarController();
const upload = multer(uploadConfig);

updateUserAvatarRoute.patch('/', authorization, upload.single('avatar'), updateUserController.update);
export default updateUserAvatarRoute;
