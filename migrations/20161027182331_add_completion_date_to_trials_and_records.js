'use strict';

exports.up = (knex) => (
    knex.schema
    .table('trials', (table) => {
      table.date('completion_date')
        .nullable();
    })
    .table('records', (table) => {
      table.date('completion_date')
        .nullable();
    })
);

exports.down = (knex) => (
    knex.schema
    .table('trials', (table) => {
      table.dropColumn('completion_date');
    })
    .table('records', (table) => {
      table.dropColumn('completion_date');
    })
);
