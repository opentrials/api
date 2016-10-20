'use strict';

exports.up = (knex) => (
  knex.schema
    .createTable('trials_documents', (table) => {
      table.uuid('trial_id')
        .references('trials.id');
      table.uuid('document_id')
        .references('documents.id')
        .index();

      table.primary(['trial_id', 'document_id']);
    })
    .raw(`
      INSERT INTO trials_documents (trial_id, document_id)
      SELECT trial_id, id FROM documents
    `)
    .table('documents', (table) => {
      table.dropColumn('trial_id');
    })
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
