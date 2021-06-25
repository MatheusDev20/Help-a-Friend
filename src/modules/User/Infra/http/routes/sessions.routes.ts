import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const controller = new AuthController();
const sessionsRouter = Router();

sessionsRouter.post('/', controller.auth);

export default sessionsRouter;
