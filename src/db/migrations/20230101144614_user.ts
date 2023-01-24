import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table)=> {
        table.increments('id').primary()
        table.string('username').notNullable().unique()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.integer('address_id').references('id').inTable('address').defaultTo(0)
        table.integer('citizenship_id').references('id').inTable('citizenship_details').defaultTo(0)
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.string('phone_number').notNullable().unique()
        table.string('profile_pic').defaultTo('./images/users/default.png')
        table.boolean('is_active').defaultTo(true)
        table.boolean('is_verified').defaultTo(false)
        table.enum('role', ['admin','user','staff','finance']).defaultTo('user')
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}