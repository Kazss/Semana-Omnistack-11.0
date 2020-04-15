const knex = require("knex");
const configuration = require("../../knexfile");

const enviroment = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(enviroment);

module.exports = connection;