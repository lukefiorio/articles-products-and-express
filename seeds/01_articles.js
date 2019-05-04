exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('articles').insert([
        {
          title: 'The Great Gatsby',
          author: 'Fitzy',
          body: 'Being rich.  Maybe you started with money, maybe you didnt - either way you ended up with it',
          urlTitle: 'The%20Great%20Gatsby',
        },
        {
          title: 'Curious George',
          author: 'Monkey Man',
          body: 'Crazy monkey entertains children with his mischevious actions dubbed "curiosity"',
          urlTitle: 'Curious%20George',
        },
        {
          title: 'The 17 little pigs',
          author: 'Wolfgang',
          body:
            'A sequal to the original 3 little pigs, this story takes us on the journey of the grandchildren of the 3 OG little pigs',
          urlTitle: 'The%2017%20little%20pigs',
        },
        {
          title: 'The Little Train that Could',
          author: 'Isaac Ican',
          body: 'He thinks he can, he thinks he can, he thinks he can...',
          urlTitle: 'The%20Little%20Train%20that%20Could',
        },
      ]);
    });
};
