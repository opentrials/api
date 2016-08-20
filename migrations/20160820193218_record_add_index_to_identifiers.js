'use strict';

exports.up = (knex) => (
  knex.schema.table('records', (table) => {
    table.index('identifiers', undefined, 'GIN');
  })
);

exports.down = (knex) => {
  knex.schema.table('records', (table) => {
    table.dropIndex('identifiers');
  })
};
