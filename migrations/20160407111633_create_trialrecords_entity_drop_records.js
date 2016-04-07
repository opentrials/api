exports.up = (knex) => {
  const createTrialrecords = knex.schema.createTable('trialrecords', (table) => {
    table.uuid('id').primary();

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

    table.text('source_url')
      .notNullable();
    table.jsonb('source_data')
      .notNullable();

    table.unique(['primary_register', 'primary_id']);
  });

  const createTrialsTrialrecords = knex.schema.createTable('trials_trialrecords', (table) => {
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

  const dropTables = knex.schema
    .dropTableIfExists('trials_records')
    .dropTableIfExists('records')

  return Promise.all([
    createTrialrecords,
    createTrialsTrialrecords,
    dropTables,
  ]);
};

exports.down = (knex) => {
  const createRecords = knex.schema.createTable('records', (table) => {
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

  const createTrialsRecords = knex.schema.createTable('trials_records', (table) => {
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

  const dropTables = knex.schema
    .dropTableIfExists('trials_trialrecords')
    .dropTableIfExists('trialrecords')

  return Promise.all([
    createRecords,
    createTrialsRecords,
    dropTables,
  ]);
};
