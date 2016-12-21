'use strict';

exports.up = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.dropColumn('source_data');
    })
);

exports.down = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.jsonb('source_data');
    })
);
