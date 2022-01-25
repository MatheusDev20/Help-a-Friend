import { Router } from 'express';
import AuthController from '../../../presentation/controllers/auth/auth-user-controller';

const controller = new AuthController();
const sessionsRouter = Router();

sessionsRouter.post('/', controller.auth);

export default sessionsRouter;
