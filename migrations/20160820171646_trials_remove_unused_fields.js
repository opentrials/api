'use strict';

exports.up = (knex) => (
  knex.schema.table('trials', (table) => {
    table.dropColumn('primary_source_id');
    table.dropColumn('primary_register');
    table.dropColumn('primary_id');
    table.dropColumn('facts');
  })
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
