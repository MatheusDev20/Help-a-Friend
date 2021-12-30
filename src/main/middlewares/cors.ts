/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';

export const enableCors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-methods', '*');
  res.set('access-control-allow-headers', '*');
  next();
};
