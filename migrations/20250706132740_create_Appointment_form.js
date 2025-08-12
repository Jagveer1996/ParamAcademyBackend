/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('appointment', (table)=>{
    table.increments('id');
    table.string('fname');
    table.string('lname');
    table.string('email');
    table.integer('course_id').unsigned().references('id').inTable('coursedetails').onDelete('CASCADE');
    table.string('country');
    table.string('phone_no');
    table.dateTime('date');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('appointment');
};
