'use strict';

exports.up = (knex, Promise) => {
  const createDiffsTable = knex.schema.createTable('diffs', (table) => {
    table.timestamps();
    table.uuid('trial_id')
      .notNullable();
    table.text('field')
      .notNullable();
    // Schema of "values":
    // [{record_id, primary_register, value}]
    table.jsonb('values')
      .notNullable();

    table.primary(['trial_id', 'field']);
  });

  return Promise.all([
    createDiffsTable,
  ]);
};

exports.down = (knex, Promise) => {
  const dropDiffsTable = knex.schema.dropTableIfExists('diffs');

  return Promise.all([
    dropDiffsTable,
  ]);
};
