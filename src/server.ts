import express from 'express';
import './database/index';
import routes from './routes/index';
import 'reflect-metadata';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('Up and Runningg');
});
