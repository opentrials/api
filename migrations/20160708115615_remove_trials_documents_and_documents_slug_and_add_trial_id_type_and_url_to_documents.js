'use strict';

exports.up = (knex) => (
  knex.schema
    .dropTable('trials_documents')
    .table('documents', (table) => {
      table.dropColumns([
        'slug',
      ]);
      table.uuid('trial_id')
        .notNullable()
        .references('trials.id');
      table.enu('type', [
        'csr',
        'epar_segment',
        'blank_consent_form',
        'patient_information_sheet',
        'blank_case_report_form',
        'other',
      ]).notNullable();
      table.text('url')
        .notNullable();

      table.unique(['trial_id', 'url']);
    })
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
