import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import '../../infra/db/helpers/postgres-conn-helper';
import routes from '../routes';
import '../../shared/dependecyContainer';
import setupMiddlewares from './app-middlewares';
import { enableError } from '../middlewares/error';

const app = express();
setupMiddlewares(app);

app.use(routes);

app.use(enableError);
export default app;
