exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('name', 255).notNull();
    table
      .integer('inventory')
      .unsigned()
      .notNull();
    table.decimal('price', 8, 2).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
