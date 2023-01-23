/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';

export const enableCors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', 'https://haf-frontend-zeta.vercel.app');
  res.set('access-control-allow-methods', 'https://haf-frontend-zeta.vercel.app/');
  res.set('access-control-allow-headers', 'https://haf-frontend-zeta.vercel.app/');

  return next();
};
