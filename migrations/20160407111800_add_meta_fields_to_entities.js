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
  const operations = [];

  tableNames.forEach((tableName) => {
    const operation = knex.schema.table(tableName, (table) => {
      table.timestamps();
      table.specificType('links', 'text[]').
        nullable().
        index(undefined, 'GIN');
      table.specificType('facts', 'text[]').
        nullable().
        index(undefined, 'GIN');
    });
    operations.push(operation);
  });

  return Promise.all(operations);
};

exports.down = (knex) => {
  const operations = [];

  tableNames.forEach((tableName) => {
    const operation = knex.schema.table(tableName, (table) => {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
      table.dropColumn('links');
      table.dropColumn('facts');
    });
    operations.push(operation);
  });

  return Promise.all(operations);
};
