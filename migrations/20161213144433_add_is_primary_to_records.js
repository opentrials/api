'use strict';

exports.up = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.boolean('is_primary')
        .nullable();
    })
);

exports.down = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.dropColumn('is_primary');
    })
);
