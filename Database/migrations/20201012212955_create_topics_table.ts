import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('topics', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.text('description');
        table.integer('branchId').unsigned().nullable();
        table.foreign('branchId').references('id').inTable('branches')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('topics');
}

