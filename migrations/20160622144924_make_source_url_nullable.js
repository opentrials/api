'use strict';

const tableNames = [
  'records',
  'publications',
];

const fieldNames = [
  'source_url',
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
