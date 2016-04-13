exports.up = (knex) => (
  knex.schema.table('trials', (table) => {
    table.boolean('has_published_results')
      .nullable();

    table.enu('gender', [
      'both',
      'male',
      'female',
    ]).nullable();
  })
);

exports.down = (knex) => (
  knex.schema.table('trials', (table) => {
    table.dropColumns([
      'has_published_results',
      'gender',
    ]);
  })
);
