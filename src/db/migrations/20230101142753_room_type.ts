import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('room_type', (table) => {
        table.increments('type').primary()
        table.string('name').notNullable().unique()
        table.string('description').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('room_type')
}

