'use strict';

exports.up = (knex) => (
  knex.schema
    .table('sources', (table) => {
      table.text('url')
        .nullable();
      table.text('terms_and_conditions_url')
        .nullable();
    })
);

exports.down = (knex) => (
  knex.schema
    .table('sources', (table) => {
      table.dropColumns(['url', 'terms_and_conditions_url']);
    })
);
