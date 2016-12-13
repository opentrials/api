'use strict';

exports.up = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.unique('source_url');
    })
);

exports.down = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.dropUnique('source_url');
    })
);

