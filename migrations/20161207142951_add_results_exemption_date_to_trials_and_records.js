'use strict';

exports.up = (knex) => (
  knex.schema
    .table('trials', (table) => {
      table.date('results_exemption_date')
        .nullable();
    })
    .table('records', (table) => {
      table.date('results_exemption_date')
        .nullable();
    })
);

exports.down = (knex) => (
  knex.schema
    .table('trials', (table) => {
      table.dropColumn('results_exemption_date');
    })
    .table('records', (table) => {
      table.dropColumn('results_exemption_date');
    })
);
