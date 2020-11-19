import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('levels', function (table) {
        table.increments();
        table.double('min_experience').defaultTo(0)
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('levels');
}

