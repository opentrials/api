exports.up = (knex) => (
  knex.schema.createTableIfNotExists('trials', (table) => {
    table.increments();
    table.string('title');
    table.timestamps();
  })
);

exports.down = (knex) => (
  knex.schema.dropTableIfExists('trials')
);
