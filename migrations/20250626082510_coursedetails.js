/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("coursedetails", (table)=>{
    table.increments("id").primary();
    table.string("courseTitle");
    table.string("discription").notNullable();
    table.string("overview").notNullable();
    table.string("learning").nullable();
    table.string("image").notNullable();
    table.string("course_level");
    table.string("course_duration");
    table.string("course_lectures");
    table.string("course_launguage");
    table.string("course_assessments");
    table.string("course_certificate");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("coursedetails");
};
