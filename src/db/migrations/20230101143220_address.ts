import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('address', (table) => {
        table.increments('id').primary()
        table.string('address_name').notNullable()
        table.float('lat').notNullable()
        table.float('lng').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('address')
}