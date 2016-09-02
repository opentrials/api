'use strict';

exports.up = (knex) => (
  knex.schema
    .table('documents', (table) => {
      table.dropUnique(['trial_id', 'url']);
      table.unique(['trial_id', 'fda_approval_id', 'url']);
    })
);

exports.down = (knex) => (
  knex.schema
    .table('documents', (table) => {
      table.unique(['trial_id', 'url']);
      table.dropUnique(['trial_id', 'fda_approval_id', 'url']);
    })
);
