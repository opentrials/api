'use strict';

const tableNames = [
  'interventions',
  'locations',
  'organisations',
  'persons',
  'problems',
  'publications',
  'sources',
  'trials',
  'trialrecords',
];

exports.up = (knex) => {
  const operations = tableNames.map((tableName) => (
    knex.schema.table(tableName, (table) => {
      let linksColumn = 'links';
      let factsColumn = 'facts';
      if (tableName === 'publications') {
        linksColumn = 'primary_facts';
        factsColumn = 'secondary_facts';
      }
      table.dropColumn(linksColumn);
      table.dropColumn(factsColumn);
    })
  ));

  return Promise.all(operations);
};

exports.down = (knex) => {
  const operations = tableNames.map((tableName) => (
    knex.schema.table(tableName, (table) => {
      let linksColumn = 'links';
      let factsColumn = 'facts';
      if (tableName === 'publications') {
        linksColumn = 'primary_facts';
        factsColumn = 'secondary_facts';
      }
      table.specificType(linksColumn, 'text[]')
        .nullable()
        .index(undefined, 'GIN');
      table.specificType(factsColumn, 'text[]')
        .nullable()
        .index(undefined, 'GIN');
    })
  ));

  return Promise.all(operations);
};
