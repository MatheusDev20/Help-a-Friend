import { Router } from 'express';
// import listDogsRouter from './list-dogs.route';
import createDogsRoute from './create-dog.route';
import updateDogsPhotos from './update-dogs-photos.route';

const dogsRoutes = Router();

// dogsRoutes.use('/list', listDogsRouter);
dogsRoutes.use('/', createDogsRoute);
dogsRoutes.use('/photo', updateDogsPhotos);

export default dogsRoutes;
