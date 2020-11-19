import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("levels").del();

    // Inserts seed entries
    await knex("levels").insert([
        { id: 1, min_experience: 0 },
        { id: 2, min_experience: 100 },
        { id: 3, min_experience: 200 }
    ]);
};
