'use strict';

exports.up = (knex) => {
  const schema = knex.schema;

  schema.createTable('risks_of_bias', (table) => {
    table.uuid('id').primary();

    table.uuid('trial_id')
      .notNullable()
      .references('trials.id');
    table.uuid('source_id')
      .notNullable()
      .references('sources.id');
    table.text('source_url')
      .notNullable();
    table.text('study_id')
      .notNullable();
    table.timestamps(true, true);
  });

  schema.createTable('risk_of_bias_criteria', (table) => {
    table.uuid('id').primary();

    table.text('name')
      .notNullable();
  });

  schema.createTable('risks_of_bias_risk_of_bias_criteria', (table) => {
    table.uuid('risk_of_bias_id')
    .references('risks_of_bias.id');
    table.uuid('risk_of_bias_criterion_id')
    .references('risk_of_bias_criteria.id');

      table.enu('value', [
        'yes',
        'no',
        'unknown',
      ]).notNullable();

    table.primary(['risk_of_bias_id', 'risk_of_bias_criterion_id']);
  });

  return schema
};

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('risks_of_bias_risk_of_bias_criteria')
    .dropTableIfExists('risk_of_bias_criteria')
    .dropTableIfExists('risks_of_bias')
);
