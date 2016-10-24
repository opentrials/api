'use strict';

exports.up = (knex) => (
  knex.schema
    .raw('ALTER TABLE documents DROP CONSTRAINT file_id_xor_url_check')
    .alterTable('documents', (table) => {
      table.dropUnique(['type', 'url']);
      table.renameColumn('url', 'source_url');
      table.unique(['type', 'source_url']);
    })
    .raw(`ALTER TABLE documents
      ADD CONSTRAINT file_id_xor_source_url_check CHECK (
      (file_id IS NULL AND source_url IS NOT NULL) OR
      (file_id IS NOT NULL AND source_url IS NULL)
    )`)

    .alterTable('files', (table) => {
      table.dropUnique(['url']);
      table.renameColumn('url', 'source_url');
      table.unique(['source_url']);
    })
    .table('sources', (table) => table.renameColumn('url', 'source_url'))
);

exports.down = (knex) => (
  knex.schema
    .alterTable('documents', (table) => {
      table.dropUnique(['type', 'source_url']);
      table.renameColumn('source_url', 'url');
      table.unique(['type', 'url']);
    })
    .alterTable('files', (table) => {
      table.dropUnique(['source_url']);
      table.renameColumn('source_url', 'url');
      table.unique(['url']);
    })
    .table('sources', (table) => table.renameColumn('source_url', 'url'))
);
