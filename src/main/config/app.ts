import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import '../../infra/db/postgres/tsyringe/containers';
import setupMiddlewares from './app-middlewares';
import { enableError } from '../middlewares/error';

const app = express();

setupMiddlewares(app);
app.use(enableError);

export default app;
