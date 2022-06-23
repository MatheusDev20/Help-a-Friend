/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import AppError from '../../errors/AppError';

// eslint-disable-next-line import/prefer-default-export
export const enableError = (err: Error, request: Request, response: Response, _: NextFunction): any => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
