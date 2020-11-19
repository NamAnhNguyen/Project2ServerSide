import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: 1,
            username: "namanh",
            password: "4444444444",
            name: "Nguyen Nam Anh",
            email: "anh.nn176002@sis.hust.edu.vn",
            levelId: 1
        },
    ]);
};
