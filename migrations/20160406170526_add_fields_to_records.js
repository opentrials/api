exports.up = (knex) => {

  const addFields = knex.schema.table('records', (table) => {
      table.text('reference').notNullable();
      table.jsonb('extracted_data').notNullable();
  });

  return Promise.all([
    addFields,
  ]);

};

exports.down = (knex) => {

  const removeFields = knex.schema.table('records', (table) => {
      table.dropColumn('reference');
      table.dropColumn('extracted_data');
  });

  return Promise.all([
    removeFields,
  ]);

};
