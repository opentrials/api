'use strict';

exports.up = (knex) => {
  const schema = knex.schema;

  schema.createTable('trialrecords', (table) => {
    table.uuid('id').primary();

    table.uuid('source_id')
      .notNullable()
      .references('sources.id');
    table.text('source_url')
      .notNullable();
    table.jsonb('source_data')
      .notNullable();

    table.text('primary_register')
      .notNullable();
    table.text('primary_id')
      .notNullable();
    table.jsonb('secondary_ids')
      .notNullable();
    table.date('registration_date')
      .notNullable();
    table.text('public_title')
      .notNullable();
    table.text('brief_summary')
      .notNullable();
    table.text('scientific_title')
      .nullable();
    table.text('description')
      .nullable();

    table.text('recruitment_status')
      .notNullable();
    table.jsonb('eligibility_criteria')
      .notNullable();
    table.integer('target_sample_size')
      .nullable();
    table.date('first_enrollment_date')
      .nullable();

    table.text('study_type')
      .notNullable();
    table.text('study_design')
      .notNullable();
    table.text('study_phase')
      .notNullable();

    table.jsonb('primary_outcomes')
      .nullable();
    table.jsonb('secondary_outcomes')
      .nullable();

    table.unique(['primary_register', 'primary_id']);
  });

  schema.createTable('trials_trialrecords', (table) => {
    table.uuid('trial_id')
      .references('trials.id');
    table.uuid('trialrecord_id')
      .references('trialrecords.id');

    table.enu('role', [
      'primary',
      'secondary',
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();

    table.primary(['trial_id', 'trialrecord_id']);
  });

  schema.dropTableIfExists('trials_records');
  schema.dropTableIfExists('records');

  return schema;
};

exports.down = (knex) => {
  const schema = knex.schema;

  schema.createTable('records', (table) => {
    table.uuid('id').primary();

    table.uuid('source_id')
      .notNullable()
      .references('sources.id');
    table.enu('type', [
      'trial',
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();
  });

  schema.createTable('trials_records', (table) => {
    table.uuid('trial_id')
      .references('trials.id');
    table.uuid('record_id')
      .references('records.id');

    table.enu('role', [
      'primary',
      'secondary',
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();

    table.primary(['trial_id', 'record_id']);
  });

  schema.dropTableIfExists('trials_trialrecords');
  schema.dropTableIfExists('trialrecords');

  return schema;
};
