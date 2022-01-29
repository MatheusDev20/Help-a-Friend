module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.ENTITIES_PATH],
  migrationsTableName: 'haf_migrations',
  cli: {
    migrationsDir: 'src/infra/db/postgres/migrations',
  },
  migrations: [
    process.env.MIGRATIONS_PATH,
  ],
  // ssl: true,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // }
}

