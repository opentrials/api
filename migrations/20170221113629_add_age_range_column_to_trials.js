
exports.up = function(knex, Promise) {
  const schema = knex.schema;

  schema.table('trials', (table) => {
    table.jsonb('age_range');
  });

  return schema;
};

exports.down = function(knex, Promise) {
   const schema = knex.schema;

  schema.table('trials', (table) => {
    table.dropColumn('age_range');
  });

  return schema;
};
