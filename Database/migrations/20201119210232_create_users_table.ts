import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('username').notNullable()
        table.string('password').notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.double('balance').defaultTo(0)
        table.double('experience').defaultTo(0)
        table.integer('levelId').references('id').inTable('levels').notNullable()

        table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

