import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex('room_type').insert({
        'type': 1,
        'name': 'Single Room',
        'description': 'This is a single Room'
    })
}


export async function down(knex: Knex): Promise<void> {
}

