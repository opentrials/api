'use strict';

exports.up = (knex) => (
  knex.schema
    .table('documents', (table) => {
      table.text('url');

      table.unique([
        'trial_id',
        'file_id',
        'fda_approval_id',
        'url',
      ]);
    })
    .raw('ALTER TABLE documents ALTER COLUMN file_id DROP NOT NULL')
    .raw(`ALTER TABLE documents
          ADD CONSTRAINT file_id_xor_url_check CHECK (
          (file_id IS NULL AND url IS NOT NULL) OR
          (file_id IS NOT NULL AND url IS NULL)
    )`)
);

exports.down = (knex) => (
  knex.schema
    .table('documents', (table) => {
      table.dropColumn('url');
    })
    .raw('ALTER TABLE documents ALTER COLUMN file_id SET NOT NULL')
);
