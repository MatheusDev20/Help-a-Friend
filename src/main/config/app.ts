import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import '../../infra/db/postgres/tsyringe/containers';
import setupMiddlewares from './app-middlewares';

const app = express();

setupMiddlewares(app);
export default app;
