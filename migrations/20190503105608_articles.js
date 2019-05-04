exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', (table) => {
    table.increments();
    table.string('title', 255).notNull();
    table.string('author', 100).notNull();
    table.string('body', 1000).notNull();
    table.string('urlTitle', 255).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
