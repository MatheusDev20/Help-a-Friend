import { Router } from 'express';
import multer from 'multer';
import authorization from '../../../../../middlewares/authorization';
import uploadConfig from '../../../../../config/upload';
import UpdateDogAvatarService from '../../../../../services/UploadDogAvatar';
import DogsController from '../controllers/DogsController';

const dogsRouter = Router();
const upload = multer(uploadConfig);
const dogsController = new DogsController();

dogsRouter.use(authorization);
dogsRouter.post('/', dogsController.create);

dogsRouter.patch(
  '/avatar/:name',
  upload.single('avatar'),
  async (request, response) => {
    const { name } = request.params;
    const updateDogAvatar = new UpdateDogAvatarService();
    const dog = await updateDogAvatar.execute({
      id: request.user.id,
      dogName: name,
      filename: request.file.filename,
    });
    return response.json(dog);
  },
);

export default dogsRouter;
