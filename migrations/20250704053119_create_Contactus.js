/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('contactUs', (table)=>{
    table.increments('id');
    table.string('fname');
    table.string('lname');
    table.string('email');
    table.string('phone_no');
    table.string('subject');
    table.string('message');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('contactUs');
};
