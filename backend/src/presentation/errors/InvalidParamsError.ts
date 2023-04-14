import { Result, ValidationError } from 'express-validator';

export class InvalidParamError {
  public errors;

  constructor(errors: Result<ValidationError>) {
    this.errors = errors;
  }
}
