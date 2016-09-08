'use strict';

exports.up = (knex) => (
  knex.schema
    .raw('ALTER TABLE documents ALTER COLUMN file_id SET NOT NULL')
    .table('documents', (table) => {
      table.dropColumns([
        'url',
        'documentcloud_url',
        'text',
      ]);
    })
);

exports.down = (knex) => (
  knex.schema
    .raw('ALTER TABLE documents ALTER COLUMN file_id DROP NOT NULL')
    .table('documents', (table) => {
      table.text('url');
      table.text('documentcloud_url');
      table.text('text');
    })
);
