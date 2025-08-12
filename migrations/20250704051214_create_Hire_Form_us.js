const { Knex } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('hirefromus', (table)=>{
    table.increments('id');
    table.string('fname');
    table.string('lname');
    table.string('email');
    table.string('phone_no');
    table.string('organization');
    table.string('job_position');
    table.string('skills');
    table.string('upload_document');
    table.string('comments');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('hirefromus');
};
