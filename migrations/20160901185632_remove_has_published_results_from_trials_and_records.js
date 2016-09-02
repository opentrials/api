'use strict';

exports.up = (knex) => (
  knex.schema
    .table('trials', (table) => table.dropColumn('has_published_results'))
    .table('records', (table) => table.dropColumn('has_published_results'))
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
