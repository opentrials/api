'use strict';

exports.up = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.boolean('is_primary')
        .defaultTo(false);
    })
);

exports.down = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.dropColumn('is_primary');
    })
);
