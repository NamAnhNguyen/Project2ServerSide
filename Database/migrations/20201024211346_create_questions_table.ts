import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('questions', function (table) {
        table.increments();

        table.string('content').notNullable();

        table.integer('lectureId').unsigned().nullable();
        table.foreign('lectureId').references('id').inTable('lectures')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');

        table.integer('topicId').unsigned().nullable();
        table.foreign('topicId').references('id').inTable('topics')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');

        table.integer('branchId').unsigned().nullable();
        table.foreign('branchId').references('id').inTable('branches')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');

        table.jsonb('answers').notNullable();

        table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('topics');
}

