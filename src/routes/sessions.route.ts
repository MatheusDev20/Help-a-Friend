import { Router } from 'express';

import AuthorizationService from '../services/AuthorizationService';

const sessionsRouter = Router();

// Create new User
sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authService = new AuthorizationService();
  const { user, token } = await authService.execute({
    email,
    password,
  });
  return res.json({
    user, token,
  });
});

export default sessionsRouter;
