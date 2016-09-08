'use strict';

exports.up = (knex) => (
  knex.schema
    .createTable('files', (table) => {
      table.uuid('id')
        .primary();

      table.text('documentcloud_id')
        .nullable()
        .unique();
      table.text('sha1')
        .notNullable()
        .unique();
      table.text('url')
        .notNullable()
        .unique();
      table.text('text')
        .nullable();
    })
    .table('documents', (table) => {
      table.uuid('file_id')
        .references('files.id');
    })
    .raw('ALTER TABLE documents ALTER COLUMN url DROP NOT NULL')
);

exports.down = (knex) => (
  knex.schema
    .table('documents', (table) => table.dropColumn('file_id'))
    .raw('ALTER TABLE documents ALTER COLUMN url SET NOT NULL')
    .dropTableIfExists('files')
);
