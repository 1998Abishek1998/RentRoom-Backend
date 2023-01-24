import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('citizenship_details', (table) => {
        table.increments('id').primary()
        table.string('images').defaultTo('/images/citizenship/default.jpg')
        table.string('number').notNullable().unique(),
        table.boolean('is_verified').defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('citizenship_details')
}

