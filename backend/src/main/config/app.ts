import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import setupMiddlewares from './app-middlewares';

const app = express();

setupMiddlewares(app);
export default app;
