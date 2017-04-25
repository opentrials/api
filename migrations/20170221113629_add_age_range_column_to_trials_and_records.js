'use strict';

exports.up = (knex) => (
  knex.schema
    .table('trials', (table) => table.jsonb('age_range'))
    .table('records', (table) => table.jsonb('age_range'))
);

exports.down = (knex) => (
  knex.schema
    .table('trials', (table) => table.dropColumn('age_range'))
    .table('records', (table) => table.dropColumn('age_range'))
);
