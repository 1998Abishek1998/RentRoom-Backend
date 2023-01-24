import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('rooms', (table)=> {
        table.increments('id').primary()
        table.string('room_name')
        table.string('description').notNullable()
        table.integer('address_id').references('id').inTable('address').defaultTo(0)
        table.integer('user_id').references('id').inTable('users')
        table.string('phone_number').notNullable().unique()
        table.string('images').defaultTo('./images/rooms/default.png')
        table.boolean('is_active').defaultTo(true)
        table.boolean('is_available').defaultTo(false)
        table.boolean('is_verified').defaultTo(false)
        table.boolean('is_parking_available').defaultTo(false)
        table.string('room_slug').defaultTo('slug')
        table.integer('price').notNullable()
        table.integer('room_type').references('type').inTable('room_type').defaultTo(1)
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('rooms')
}

