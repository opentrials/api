'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

const typeToCategoryMapping = {
  blank_consent_form: 33,
  patient_information_sheet: 33,
  blank_case_report_form: 29,
  csr: 22,
  csr_synopsis: 23,
  epar_segment: 24,
  other: 20,
};


exports.up = (knex) => (
  knex.schema.table('documents', (table) =>
    table.integer('document_category_id')
      .references('document_categories.id')
      .notNullable()
  )
  .then(() =>
    Promise.map(_.keys(typeToCategoryMapping), (type) =>
      knex('documents').where('type', type)
        .update('document_category_id', typeToCategoryMapping[type])
    )
  )
  .then(() =>
    knex('documents').where({ type: 'results', source_id: 'euctr' })
      .update('document_category_id', 24)
  )
  .then(() =>
    knex('documents').where({ type: 'results', source_id: 'nct' })
      .update('document_category_id', 22)
  )
  .then(() =>
    knex.schema.table('documents', (table) =>
      table.dropColumn('type')
    )
  )
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
