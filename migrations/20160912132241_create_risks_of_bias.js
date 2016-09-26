'use strict';

exports.up = (knex) => {
  const schema = knex.schema;

  schema.createTable('risk_of_biases', (table) => {
    table.uuid('id').primary();

    table.uuid('trial_id')
      .notNullable()
      .references('trials.id');
    table.text('source_id')
      .notNullable()
      .references('sources.id');
    table.text('source_url')
      .notNullable();
    table.text('study_id')
      .notNullable();
    table.timestamps(true, true);

    table.unique(['study_id', 'source_url']);
  });

  schema.createTable('risk_of_bias_criterias', (table) => {
    table.uuid('id').primary();

    table.text('name')
      .notNullable();
    table.timestamps(true, true);
  });

  schema.createTable('risk_of_biases_risk_of_bias_criterias', (table) => {
    table.uuid('risk_of_bias_id')
      .references('risk_of_biases.id');
    table.uuid('risk_of_bias_criteria_id')
      .references('risk_of_bias_criterias.id');

    table.enu('value', [
      'yes',
      'no',
      'unknown',
    ]).notNullable();

    table.primary(['risk_of_bias_id', 'risk_of_bias_criteria_id']);
  });

  return schema;
};

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('risk_of_biases_risk_of_bias_criterias')
    .dropTableIfExists('risk_of_bias_criterias')
    .dropTableIfExists('risk_of_biases')
);
