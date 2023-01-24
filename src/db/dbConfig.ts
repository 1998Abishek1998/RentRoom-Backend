import knex from "knex";
import dbConfig from "./knexfile";

const db = knex(dbConfig.development)
export default db