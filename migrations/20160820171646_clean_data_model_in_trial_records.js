'use strict';

exports.up = (knex) => (
  knex.schema
    .table('trials', (table) => {
      table.dropColumn('primary_register');
      table.dropColumn('primary_id');
      table.dropColumn('facts');
      table.dropColumn('slug');
    })
    .table('records', (table) => {
      table.renameColumn('primary_source_id', 'source_id' );
      table.dropColumn('primary_register');
      table.renameColumn('primary_id', 'source_trial_id');
      table.index('identifiers', undefined, 'GIN');
    })
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
