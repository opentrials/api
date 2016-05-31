'use strict';

exports.up = (knex) => (
  knex.schema
    .table('records', (table) => {
      table.dropUnique(undefined, 'trialrecords_primary_register_primary_id_unique');
      table.unique(['source_id', 'primary_id']);
    })
);

exports.down = () => {
  // Rollback will fail on a good data
  throw Error('Destructive migration can\'t be rolled back.');
};
