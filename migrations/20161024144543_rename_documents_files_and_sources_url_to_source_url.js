'use strict';

exports.up = (knex) => (
  knex.schema
    .table('documents', (table) => table.renameColumn('url', 'source_url'))
    .raw('ALTER TABLE documents RENAME CONSTRAINT documents_type_url_unique TO documents_type_source_url_unique')
    .raw('ALTER TABLE documents RENAME CONSTRAINT file_id_xor_url_check TO file_id_xor_source_url_check')

    .table('files', (table) => table.renameColumn('url', 'source_url'))
    .raw('ALTER TABLE files RENAME CONSTRAINT files_url_unique TO files_source_url_unique')

    .table('sources', (table) => table.renameColumn('url', 'source_url'))
);

exports.down = (knex) => (
  knex.schema
    .table('documents', (table) => table.renameColumn('source_url', 'url'))
    .raw('ALTER TABLE documents RENAME CONSTRAINT documents_type_source_url_unique TO documents_type_url_unique')
    .raw('ALTER TABLE documents RENAME CONSTRAINT file_id_xor_source_url_check TO file_id_xor_url_check')

    .table('files', (table) => table.renameColumn('source_url', 'url'))
    .raw('ALTER TABLE files RENAME CONSTRAINT files_source_url_unique TO files_url_unique')

    .table('sources', (table) => table.renameColumn('source_url', 'url'))
);
