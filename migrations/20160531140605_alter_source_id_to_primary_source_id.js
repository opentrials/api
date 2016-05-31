'use strict';

exports.up = (knex) => {
  const schema = knex.schema;

  schema.table('trials', (table) => {
    table.renameColumn('source_id', 'primary_source_id');
  });

  schema.table('records', (table) => {
    table.renameColumn('source_id', 'primary_source_id');
  });

  return schema;
};

exports.down = (knex) => {
  const schema = knex.schema;

  schema.table('trials', (table) => {
    table.renameColumn('primary_source_id', 'source_id');
  });

  schema.table('records', (table) => {
    table.renameColumn('primary_source_id', 'source_id');
  });

  return schema;
};
