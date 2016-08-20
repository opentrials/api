'use strict';

exports.up = (knex) => (
  knex.schema
    .table('records', (table) => table.renameColumn('primary_source_id', 'source_id'))
);

exports.down = (knex) => (
  knex.schema
    .table('records', (table) => table.renameColumn('source_id', 'primary_source_id'))
);
