import { Router } from 'express';
import CreateDogController from '../../../presentation/controllers/dogs/create-dog-controller';
import authorization from '../../../middlewares/authorization';

const createDogRouter = Router();
const createDogController = new CreateDogController();

createDogRouter.post('/', authorization, createDogController.create);

export default createDogRouter;
