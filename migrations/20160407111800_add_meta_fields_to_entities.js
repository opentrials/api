const tableNames = [
  'interventions',
  'locations',
  'organisations',
  'persons',
  'problems',
  'sources',
  'trials',
  'trialrecords',
];

exports.up = (knex) => {
  const operations = tableNames.map((tableName) => (
    knex.schema.table(tableName, (table) => {
      table.timestamps();
      table.specificType('links', 'text[]')
        .nullable()
        .index(undefined, 'GIN');
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
        'created_at',
        'updated_at',
        'links',
        'facts',
      ]);
    })
  ));

  return Promise.all(operations);
};
