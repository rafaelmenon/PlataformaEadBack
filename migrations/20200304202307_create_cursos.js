exports.up = function(knex) {
  return knex.schema.createTable("cursos", table => {
    table.increments("id").primary();
    table.string("nome").notNull();
    table.string("descricao");
    table.string("imagem");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cursos");
};
