module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/infra/db/postgres/entities/*.js'],
  migrationsTableName: 'haf_migrations',
  cli: {
    migrationsDir: 'src/infra/db/postgres/migrations',
  },
  migrations: [
    'src/infra/migrations/typeorm/migrations/*.js',
  ],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  }
}

