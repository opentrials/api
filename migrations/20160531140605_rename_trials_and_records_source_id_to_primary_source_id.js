'use strict';

exports.up = (knex) => (
  knex.schema
    .table('trials', (table) => table.renameColumn('source_id', 'primary_source_id'))
    .table('records', (table) => table.renameColumn('source_id', 'primary_source_id'))
);

exports.down = (knex) => (
  knex.schema
    .table('trials', (table) => table.renameColumn('primary_source_id', 'source_id'))
    .table('records', (table) => table.renameColumn('primary_source_id', 'source_id'))
);
