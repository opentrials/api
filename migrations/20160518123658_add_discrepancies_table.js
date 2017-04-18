'use strict';

exports.up = (knex, Promise) => {
  const createTable = knex.schema.createTable('discrepancies', (table) => {
    table.timestamps();
    table.uuid('trial_id')
      .notNullable();
    table.text('field')
      .notNullable();
    // Schema of "values" field:
    // [{record_id, primary_register, value}]
    table.jsonb('values')
      .notNullable();

    table.primary(['trial_id', 'field']);
  });

  return Promise.all([
    createTable,
  ]);
};

exports.down = (knex, Promise) => {
  const dropTable = knex.schema.dropTableIfExists('discrepancies');

  return Promise.all([
    dropTable,
  ]);
};
