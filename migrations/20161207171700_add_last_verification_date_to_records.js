'use strict';

exports.up = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.date('last_verification_date')
        .nullable();
    })
);

exports.down = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.dropColumn('last_verification_date');
    })
);
