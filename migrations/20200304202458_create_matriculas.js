exports.up = function(knex) {
  return knex.schema.createTable("matriculas", table => {
    table.increments("id").primary();
    table
      .integer("aluno")
      .unsigned()
      .notNullable();
    table
      .integer("curso")
      .unsigned()
      .notNullable();
    table
      .foreign("aluno")
      .references("id")
      .inTable("usuarios");
    table
      .foreign("curso")
      .references("id")
      .inTable("cursos");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("matriculas");
};
