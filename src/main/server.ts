import dotenv from 'dotenv';
import { postgresConnection } from '../infra/db/helpers/postgres-conn-helper';
import app from './config/app';
import setupRoutes from './config/setup-routes';

dotenv.config();

app.listen(process.env.PORT, async () => {
  await postgresConnection;
  setupRoutes(app);
  console.log(`App Running on PORT: ${process.env.PORT}`);
});
