/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';

export const enableCors = (req: Request, res: Response, next: NextFunction): void => {
  const allowedOrigins = ['https://haf-frontend-zeta.vercel.app', 'http://localhost:3000'];
  const { origin } = req.headers;
  if (origin) {
    if (allowedOrigins.includes(origin)) {
      res.set('access-control-allow-origin', origin);
      res.set('access-control-allow-methods', origin);
      res.set('access-control-allow-headers', origin);
    }
  }

  return next();
};
