'use strict';

exports.up = (knex) => (
  knex.schema
    .raw('ALTER TABLE documents DROP CONSTRAINT documents_type_check')
    .raw(`ALTER TABLE documents ADD CONSTRAINT documents_type_check
          CHECK (type = ANY(ARRAY[
              'csr'::text,
              'csr_synopsis'::text,
              'epar_segment'::text,
              'blank_consent_form'::text,
              'patient_information_sheet'::text,
              'blank_case_report_form'::text,
              'results'::text,
              'other'::text
          ]))
    `)
);

exports.down = (knex) => (
  knex.schema
    .raw('ALTER TABLE documents DROP CONSTRAINT documents_type_check')
    .raw(`ALTER TABLE documents ADD CONSTRAINT documents_type_check
          CHECK (type = ANY(ARRAY[
              'csr'::text,
              'csr_synopsis'::text,
              'epar_segment'::text,
              'blank_consent_form'::text,
              'patient_information_sheet'::text,
              'blank_case_report_form'::text,
              'other'::text
          ]))
    `)
);
