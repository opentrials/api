'use strict';

exports.up = (knex) => (
  knex.schema.table('documents', (table) => {
    table.text('text')
      .nullable();
    table.text('documentcloud_url')
      .nullable();
  })
);

exports.down = (knex) => (
    knex.schema.table('documents', (table) => {
      table.dropColumns([
        'text',
        'documentcloud_url',
      ]);
    })
);
