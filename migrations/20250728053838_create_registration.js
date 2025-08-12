/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('registration', (table)=>{
    table.increments('id');
    table.string('fname');
    table.string('lname');
    table.string('email');
    table.string('country_id');
    table.string('phone_no');
    table.string('password');
    table.enum('role',['superAdmin', 'admin', 'student', 'instructor']);
    table.string('refresh_token').nullable();
    table.string('reset_token').nullable();
    table.timestamp('reset_token_expiry').nullable();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('registration');
};
