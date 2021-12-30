import { Response, Request, NextFunction } from 'express';
import AppError from '../errors/AppError';

function ValidateEmail(email: string) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return (true);
  }
  return undefined;
}

export default function
userDataValidation(request: Request, _: Response, next: NextFunction):
void {
  const { name, password, email } = request.body;
  if (typeof (name) !== 'string') {
    throw new AppError('Name should be a string value');
  }
  if (name.length > 20) {
    throw new AppError('Name should be a max of 20 Characters');
  }
  if (typeof (password) !== 'string') {
    throw new AppError('password should be a string value');
  }
  if (password.length < 6 || password.length > 10) {
    throw new AppError('Please enter a password between 6 and 10 characters');
  }
  const emailValidation = ValidateEmail(email);
  if (!emailValidation) {
    throw new AppError('Please enter a valid email address');
  }
  return next();
}
