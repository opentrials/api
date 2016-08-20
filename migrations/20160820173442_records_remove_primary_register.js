'use strict';

exports.up = (knex) => (
  knex.schema.table('records', (table) => {
    table.dropColumn('primary_register');
  })
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
