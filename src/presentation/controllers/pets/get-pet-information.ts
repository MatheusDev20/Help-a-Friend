/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';

export class GetPetInformation {
  public async handle(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'Okay lesgo' });
  }
}
