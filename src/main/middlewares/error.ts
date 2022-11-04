/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError } from 'express-validator';
import { InvalidParamError } from '../../presentation/errors/InvalidParamsError';
import AppError from '../../errors/AppError';

// eslint-disable-next-line import/prefer-default-export
export const enableError = (err: Error | Result<ValidationError>, request: Request, response: Response, _: NextFunction): any => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  if (err instanceof InvalidParamError) {
    return response.status(400).json({
      statusCOde: 400,
      errors: err.errors.array(),
    });
  }
  console.error('Ta dando merda aqui -->', err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
