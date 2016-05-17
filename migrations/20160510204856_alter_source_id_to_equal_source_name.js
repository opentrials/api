'use strict';

const tableNames = [
  'documents',
  'interventions',
  'locations',
  'organisations',
  'persons',
  'problems',
  'publications',
  'trialrecords',
];

exports.up = (knex) => {
  const schema = knex.schema;

  tableNames.forEach((tableName) => {
    schema.table(tableName, (table) => {
      table.dropForeign('source_id');
    });
    schema.raw(`ALTER TABLE ${tableName} ALTER COLUMN source_id TYPE text`);
  });

  schema.raw('ALTER TABLE sources ALTER COLUMN id TYPE text');

  tableNames.forEach((tableName) => {
    schema.table(tableName, (table) => {
      table.foreign('source_id')
        .references('sources.id')
        .onUpdate('CASCADE');
    });
  });

  schema.raw('UPDATE sources SET id = name');

  return schema;
};

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
