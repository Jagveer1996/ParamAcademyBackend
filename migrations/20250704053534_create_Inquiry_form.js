/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('inquiry', (table)=>{
    table.increments('id');
    table.string('fname');
    table.string('lname');
    table.string('email');
    table.integer('course_id').unsigned().references('id').inTable('coursedetails').onDelete('CASCADE');
    table.string('country');
    table.string('phone_no');
    table.string('education');
    table.string('status');
    table.boolean('approved');
    table.timestamps(true, true);
  })
};

    // table.integer("scourse_ID").unsigned().references("cid").inTable(' course').onDelete('CASCADE');


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('inquiry')
};
