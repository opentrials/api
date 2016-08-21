'use strict';

exports.up = (knex) => (
  knex.schema
    .table('records', (table) => table.renameColumn('primary_id', 'source_trial_id'))
);

exports.down = (knex) => (
  knex.schema
    .table('records', (table) => table.renameColumn('source_trial_id', 'primary_id'))
);
