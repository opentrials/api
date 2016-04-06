var tables = [
    'interventions',
    'locations',
    'organisations',
    'persons',
    'problems',
    'records',
    'sources',
    'trials',
]

exports.up = (knex) => {

  var operations = []
  tables.forEach((table) => {
      var addTimestamps = knex.schema.table(table, (table) => {
          table.timestamp('created_at').nullable();
          table.timestamp('updated_at').nullable();
          table.specificType('links', 'text[]').nullable();
          table.specificType('facts', 'text[]').nullable();
      });
      var addLinks = knex.schema.raw(
        'CREATE INDEX '+table+'_links_idx on '+table+' USING GIN(links)')
      var addFacts = knex.schema.raw(
        'CREATE INDEX '+table+'_facts_idx on '+table+' USING GIN(facts)')
      operations.push(addTimestamps);
      operations.push(addLinks);
      operations.push(addFacts);
  });

  return Promise.all(operations);

};

exports.down = (knex) => {

  var operations = []
  tables.forEach((table) => {
      var removeFields = knex.schema.table(table, (table) => {
          table.dropColumn('created_at');
          table.dropColumn('updated_at');
          table.dropColumn('links');
          table.dropColumn('facts');
      });
      operations.push(removeFields);
  });

  return Promise.all(operations);

};
