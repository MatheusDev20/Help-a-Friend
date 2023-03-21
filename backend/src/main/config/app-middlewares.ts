import express, { Express } from 'express';
import cors from 'cors';
import { jsonParser } from '../middlewares';
import upload from '../../config/storage/upload';

export default (app: Express): void => {
  app.use('/files', express.static(upload.directory));
  app.use(jsonParser);
  app.use(cors());
};
