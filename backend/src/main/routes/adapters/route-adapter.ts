import { Request, Response } from 'express';
import { Controller } from '../../../presentation/protocols/controller';

export default (controller: Controller) => async (req: Request, res: Response) => {
  await controller.handle(req, res);
};
