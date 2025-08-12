const config = require('../knexfile');
const knex = require('knex')(config.development);

const {attachPaginate} = require('knex-paginate');
attachPaginate();

module.exports = knex;