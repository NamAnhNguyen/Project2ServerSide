import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('lectures', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.text('description');
        table.integer('topicId').unsigned().nullable();
        table.foreign('topicId').references('id').inTable('topics')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');
        table.text('pathFile').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('lectures');
}