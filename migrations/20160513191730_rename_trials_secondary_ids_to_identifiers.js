'use strict';

exports.up = (knex) => {
  const schema = knex.schema;

  schema.table('trials', (table) => {
    table.renameColumn('secondary_ids', 'identifiers');
  });

  schema.table('trialrecords', (table) => {
    table.renameColumn('secondary_ids', 'identifiers');
  });

  return schema;
};

exports.down = (knex) => {
  const schema = knex.schema;

  schema.table('trials', (table) => {
    table.renameColumn('identifiers', 'secondary_ids');
  });

  schema.table('trialrecords', (table) => {
    table.renameColumn('identifiers', 'secondary_ids');
  });

  return schema;
};
