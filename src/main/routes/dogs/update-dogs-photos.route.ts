import { Router } from 'express';
import multer from 'multer';
import UpdateDogsPhotos from '../../../presentation/controllers/dogs/update-dogs-photos';
import authorization from '../../../middlewares/authorization';
import uploadConfig from '../../../config/upload';

const updateDogsPhotos = Router();
const upload = multer(uploadConfig);
const updateDogsPhotosController = new UpdateDogsPhotos();

updateDogsPhotos.patch('/', authorization, upload.single('photo'), updateDogsPhotosController.update);

export default updateDogsPhotos;
