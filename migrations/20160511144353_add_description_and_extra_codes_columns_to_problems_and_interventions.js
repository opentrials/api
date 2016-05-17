'use strict';

exports.up = (knex) => {
  const schema = knex.schema;

  // knex don't use native Posgres emum
  schema.raw('ALTER TABLE interventions ' +
      'DROP CONSTRAINT interventions_type_check;');
  schema.raw('ALTER TABLE interventions ' +
      'ADD CONSTRAINT interventions_type_check ' +
      'CHECK (type = ANY(ARRAY[\'drug\'::text, \'procedure\'::text, \'other\'::text]));');

  schema.table('problems', (table) => {
    table.text('description');
    table.text('icdcm_code');
  });

  schema.table('interventions', (table) => {
    table.text('description');
    table.text('icdpcs_code');
    table.text('ndc_code');
  });

  return schema;
};

exports.down = (knex) => {
  const schema = knex.schema;

  schema.table('problems', (table) => {
    table.dropColumn('description');
    table.dropColumn('icdcm_code');
  });

  schema.table('interventions', (table) => {
    table.dropColumn('description');
    table.dropColumn('icdpcs_code');
    table.dropColumn('ndc_code');
  });

  return schema;
};
