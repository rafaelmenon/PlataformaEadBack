// Update with your config settings.

module.exports = {
  client: "mysql",
  connection: {
    host: "remotemysql.com",
    database: "bl6V8bI9zN",
    user: "bl6V8bI9zN",
    password: "Kwc41iXdPw"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
