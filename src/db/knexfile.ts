import type { Knex } from "knex";
import path from "path";

import 'dotenv/config'

// Update with your config settings.


// Create new migration
// knex migrate:make migration_name --migrations-directory src/db/migrations -x ts


// migration up or down 
// knex migrate:{down/up} --knexfile src/db/migrations/{migration_filename}


interface IKnexConfig { 
  [key: string]: Knex.Config, 
}

const dbConfig: IKnexConfig  = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'abishek',
      password : 'Password@123',
      database : 'postgres'
    },
    useNullAsDefault: true,
    migrations:{
      directory: path.join(__dirname, 'migrations')
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default dbConfig;
