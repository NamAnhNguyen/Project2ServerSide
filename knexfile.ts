// Update with your config settings.

module.exports = {

  development: {
    client: "pg",
    connection: {
      database: "project2",
      user: "postgres",
      password: "123456"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./Database/migrations"
    },
    seeds: {
      directory: "./Database/seeds"
    }
  },

  staging: {
    client: "pg",
    connection: {
      database: "project2",
      user: "postgres",
      password: "123456"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./Database/migrations"
    },
    seeds: {
      directory: "./Database/seeds"
    }
  },

  production: {
    client: "pg",
    connection: {
      database: "project2",
      user: "postgres",
      password: "123456"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
