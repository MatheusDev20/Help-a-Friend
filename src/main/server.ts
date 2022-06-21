import dotenv from 'dotenv';
import { postgresConnection } from '../infra/db/helpers/postgres-conn-helper';
import app from './config/app';
import setupRoutes from './config/setup-routes';
import { enableError } from './middlewares/error';

dotenv.config();

app.listen(process.env.PORT, async () => {
  await postgresConnection;
  setupRoutes(app);
  app.use(enableError);
  console.log(`App Running on PORT: ${process.env.PORT}`);
});
