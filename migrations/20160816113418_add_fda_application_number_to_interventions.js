'use strict';

exports.up = (knex) => (
    knex.schema.table('interventions', (table) => {
      table.text('fda_application_number')
        .nullable()
        .index();
    })
);

exports.down = (knex) => (
    knex.schema.table('interventions', (table) => {
      table.dropColumn('fda_application_number');
    })
);
