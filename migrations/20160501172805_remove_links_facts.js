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
      let links_column = 'links';
      let facts_column = 'facts';
      if (tableName === 'publications') {
        links_column = 'primary_facts';
        facts_column = 'secondary_facts';
      }
      table.dropColumn(links_column);
      table.dropColumn(facts_column);
    })
  ));

  return Promise.all(operations);
};

exports.down = (knex) => {
  const operations = tableNames.map((tableName) => (
    knex.schema.table(tableName, (table) => {
      let links_column = 'links';
      let facts_column = 'facts';
      if (tableName === 'publications') {
        links_column = 'primary_facts';
        facts_column = 'secondary_facts';
      }
      table.specificType(links_column, 'text[]')
        .nullable()
        .index(undefined, 'GIN');
      table.specificType(facts_column, 'text[]')
        .nullable()
        .index(undefined, 'GIN');
    })
  ));

  return Promise.all(operations);
};
