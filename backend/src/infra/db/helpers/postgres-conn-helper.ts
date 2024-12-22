import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const source = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [process.env.ENTITIES_PATH as string],
  migrations: [process.env.MIGRATIONS_DIR as string],
});

export { source };
