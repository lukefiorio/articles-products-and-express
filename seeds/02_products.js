exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'banana', inventory: 1000, price: 0.89 },
        { name: 'beachball', inventory: 120, price: 9.95 },
        { name: 'car', inventory: 20, price: 19745.0 },
      ]);
    });
};
