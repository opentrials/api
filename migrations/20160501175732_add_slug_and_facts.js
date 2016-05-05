'use strict';

const tableNames = [
  'documents',
  'interventions',
  'locations',
  'organisations',
  'persons',
  'problems',
  'publications',
  'trials',
];

exports.up = (knex) => {
  const operations = tableNames.map((tableName) => (
    knex.schema.table(tableName, (table) => {
      table.text('slug')
        .nullable()
        .unique();
      table.specificType('facts', 'text[]')
        .nullable()
        .index(undefined, 'GIN');
    })
  ));

  return Promise.all(operations);
};

exports.down = (knex) => {
  const operations = tableNames.map((tableName) => (
    knex.schema.table(tableName, (table) => {
      table.dropColumns([
        'slug',
        'facts',
      ]);
    })
  ));

  return Promise.all(operations);
};
