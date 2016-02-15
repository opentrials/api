exports.seed = (knex, Promise) => (
  Promise.all([
    // Deletes ALL existing entries
    knex('trials').del(),

    // Inserts seed entries
    knex('trials').insert({ id: 1, title: 'Trial 1' }),
    knex('trials').insert({ id: 2, title: 'Trial 2' }),
    knex('trials').insert({ id: 3, title: 'Trial 3' }),
  ])
);
