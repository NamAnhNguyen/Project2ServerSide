import * as knex from 'knex'

const builder = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: "postgres",
        password: "123456",
        database: "project2"
    },
    pool: { min: 0, max: 7 },
    migrations: {
        tableName: "knex_migrations",
        directory: "./Database/migrations"
    },
    seeds: {
        directory: "./Database/seeds"
    }
});
export default builder;