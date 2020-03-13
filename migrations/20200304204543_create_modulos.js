exports.up = function(knex) {
  return knex.schema.createTable("modulos", table => {
    table.increments("id").primary();
    table
      .integer("idCurso")
      .unsigned()
      .notNullable();
    table
      .foreign("idCurso")
      .references("id")
      .inTable("cursos");
    table.string("nome").notNullable();
    table.string("descricao");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("modulos");
};
