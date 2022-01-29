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



[{"id":"9148cbd4-b477-470b-9e1f-9b65cf8ca604","url":"http://localhost:3333/files/302ad4d2fd579de688fd-teste.jpeg"}]