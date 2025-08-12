/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('workwithus', (table)=>{
    table.increments('id');
    table.string('fname');
    table.string('lname');
    table.string('email');
    table.string('phone_no');
    table.string('social_profile');
    table.string('upload_document');
    table.string('teaching_experience');
    table.string('why_joinus');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('workwithus');
};
