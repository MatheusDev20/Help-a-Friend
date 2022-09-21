import { createConnection } from 'typeorm';

createConnection();

const postgresConnection = new Promise((resolve, reject) => {
  try {
    console.log(process.env.DATABASE_URL);
    resolve(createConnection());
  } catch (error) {
    reject(error);
  }
});

export { postgresConnection };
