'use strict';

const tableNames = [
  'interventions',
  'locations',
  'organisations',
  'persons',
  'problems',
];

exports.up = (knex, Promise) => {
  const operations = tableNames.map((tableName) => (
    knex.schema.table(tableName, (table) => {
      table.uuid('source_id')
        .references('sources.id')
        .nullable();
    })
  ));

  return Promise.all(operations);
};

exports.down = (knex, Promise) => {
  const operations = tableNames.map((tableName) => (
    knex.schema.table(tableName, (table) => {
      table.dropColumn('source_id');
    })
  ));

  return Promise.all(operations);
};
