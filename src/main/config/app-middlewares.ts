import express, { Express } from 'express';

import { enableCors, jsonParser } from '../middlewares';
import upload from '../../config/upload';

export default (app: Express): void => {
  app.use('/files', express.static(upload.directory));
  app.use(jsonParser);
  app.use(enableCors);
};
