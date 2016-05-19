'use strict';

exports.up = (knex) => {
  const schema = knex.schema;

  schema.table('trials', (table) => {
    table.text('source_id').
      references('sources.id').
      onUpdate('CASCADE');
  });

  return schema;
};

exports.down = (knex) => {
  const schema = knex.schema;

  schema.table('trials', (table) => {
    table.dropColumn('source_id');
  });

  return schema;
};
