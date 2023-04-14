let ssl_enable = false;
let ssl_confs = null;

if (process.env.ENVIROMENT == 'PROD') {
  ssl_enable = true;
  ssl_confs = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [process.env.ENTITIES_PATH],
  cli: {
    migrationsDir: process.env.MIGRATIONS_DIR,
  },
  migrations: [
    process.env.MIGRATIONS_PATH,
  ],
  ssl: ssl_enable,
  extra: ssl_confs,
};
