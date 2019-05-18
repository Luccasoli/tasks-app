const config = require('../knexfile.js')

// Conecta com DB
const knex = require('knex')(config)

knex.migrate.latest([config])
module.exports = knex
