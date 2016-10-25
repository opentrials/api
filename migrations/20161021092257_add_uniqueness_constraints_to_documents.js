'use strict';

exports.up = (knex) => (
  knex.schema
    .alterTable('documents', (table) => {
      table.unique(['fda_approval_id', 'file_id', 'name']);
    })
    .raw(`
      CREATE UNIQUE INDEX
      non_fda_documents_type_file_id_unique
      ON documents (type, file_id)
      WHERE fda_approval_id IS NULL
    `)
    .raw(`
      CREATE UNIQUE INDEX
      non_fda_documents_type_url_unique
      ON documents (type, url)
      WHERE fda_approval_id IS NULL
    `)
);

exports.down = (knex) => (
  knex.schema
    .alterTable('documents', (table) => {
      table.dropUnique(['fda_approval_id', 'file_id', 'name']);
    })
    .raw('DROP INDEX non_fda_documents_type_file_id_unique')
    .raw('DROP INDEX non_fda_documents_type_url_unique')
);
