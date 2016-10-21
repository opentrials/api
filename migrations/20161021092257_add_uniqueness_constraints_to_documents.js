'use strict';

exports.up = (knex) => (
  knex.schema
    .alterTable('documents', (table) => {
      table.unique(['fda_approval_id', 'file_id', 'name']);
      table.unique(['type', 'file_id']);
      table.unique(['type', 'url']);
    })
);

exports.down = (knex) => (
  knex.schema
    .alterTable('documents', (table) => {
      table.dropUnique(['fda_approval_id', 'file_id', 'name']);
      table.dropUnique(['type', 'file_id']);
      table.dropUnique(['type', 'url']);
    })
);
