/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('coursedetails', (table)=>{
    table.integer("category_id").unsigned().references("id").inTable('category').onDelete("CASCADE");
  
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('coursedetails', (table)=>{
    table.dropColumn('category_id');
  })
};
