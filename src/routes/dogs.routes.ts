import { Router } from 'express';
import multer from 'multer';
import CreateDogService from '../modules/Dogs/Services/CreateDogsService';
import authorization from '../middlewares/authorization';
import uploadConfig from '../config/upload';
import UpdateDogAvatarService from '../services/UploadDogAvatar';

const dogsRouter = Router();
const upload = multer(uploadConfig);

dogsRouter.use(authorization);
// Create new User
dogsRouter.post('/', async (req, res) => {
  const {
    name, gender, size, history, castrated, vaccinated,
  } = req.body;
  const createDog = new CreateDogService();
  const { id } = req.user;
  const dog = await createDog.execute({
    name, gender, size, user_id: id, history, castrated, vaccinated,
  });
  console.log(req.user.id);
  return res.json(dog);
});
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
