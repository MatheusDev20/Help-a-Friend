import { Router } from 'express';
import listDogsRouter from './list-dogs.route';

const dogsRoutes = Router();

dogsRoutes.use('/list', listDogsRouter);

export default dogsRoutes;
