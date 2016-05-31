'use strict';

const tableNames = [
  'trials',
  'records',
];

const fieldNames = [
  'registration_date',
  'brief_summary',
  'recruitment_status',
  'eligibility_criteria',
  'study_type',
  'study_design',
  'study_phase',
];

exports.up = (knex) => {
  const schema = knex.schema;

  tableNames.forEach((tableName) => {
    fieldNames.forEach((fieldName) => {
      schema.raw(`ALTER TABLE ${tableName} ALTER COLUMN ${fieldName} DROP NOT NULL`);
    });
  });

  return schema;
};

exports.down = (knex) => {
  const schema = knex.schema;

  tableNames.forEach((tableName) => {
    fieldNames.forEach((fieldName) => {
      schema.raw(`ALTER TABLE ${tableName} ALTER COLUMN ${fieldName} SET NOT NULL`);
    });
  });

  return schema;
};
