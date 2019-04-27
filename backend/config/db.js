const config = require('../knexfile.js')
const knex = require('knex')()

knex.migrate.latest([config])
module.exports = knex
