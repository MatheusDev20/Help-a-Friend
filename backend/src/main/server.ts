import dotenv from 'dotenv';
// import path from 'path';
import { source } from '../infra/db/helpers/postgres-conn-helper';
import app from './config/app';
import setupRoutes from './config/setup-routes';
import { enableError } from './middlewares/error';

dotenv.config();
app.listen(process.env.PORT, async () => {
  source.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
  setupRoutes(app);
  app.use(enableError);
  console.log(`App Running on PORT: ${process.env.PORT}`);
});
