import { createConnection } from 'typeorm';

createConnection();

const postgresConnection = new Promise((resolve, reject) => {
  try {
    resolve(createConnection());
  } catch (error) {
    reject(error);
  }
});

export { postgresConnection };
