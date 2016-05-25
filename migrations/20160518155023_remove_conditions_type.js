'use strict';

exports.up = (knex) => (
  knex.schema
    .table('conditions', (table) => {
      table.dropColumn('type');
    })
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
