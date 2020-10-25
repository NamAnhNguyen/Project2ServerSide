import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('question_levels', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.text('description');
       
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('question_levels');
}
