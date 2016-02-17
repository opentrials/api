// Changed UUID => ID
// Tables are plural
exports.up = (knex) => {
  const createSources = knex.schema.createTable('sources', (table) => {
    table.uuid('id')
      .primary();
    table.text('name')
      .notNullable();
    table.enu('type', [
      'register',
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();

    table.unique(['name', 'type']);
  });

  const createTrials = knex.schema.createTable('trials', (table) => {
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

    table.unique(['primary_register', 'primary_id']);
  });

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

  const createPublications = knex.schema.createTable('publications', (table) => {
    table.uuid('id').primary();

    table.uuid('source_id')
      .notNullable()
      .references('sources.id');
    table.text('name');
    table.enu('type', [
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();

    table.unique(['name', 'type']);
  });

  const createTrialsPublications = knex.schema.createTable('trials_publications', (table) => {
    table.uuid('trial_id')
      .references('trials.id');
    table.uuid('publication_id')
      .references('publications.id');

    table.enu('role', [
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();

    table.primary(['trial_id', 'publication_id']);
  });

  const createDocuments = knex.schema.createTable('documents', (table) => {
    table.uuid('id').primary();
    table.uuid('source_id')
      .references('sources.id');

    table.text('name')
      .notNullable();
    table.enu('type', [
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();

    table.unique(['name', 'type']);
  });

  const createTrialsDocuments = knex.schema.createTable('trials_documents', (table) => {
    table.uuid('trial_id')
      .references('trials.id');
    table.uuid('document_id')
      .references('documents.id');

    table.enu('role', [
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();

    table.primary(['trial_id', 'document_id']);
  });

  const createProblems = knex.schema.createTable('problems', (table) => {
    table.uuid('id').primary();

    table.text('name')
      .notNullable();
    table.enu('type', [
      'condition',
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();

    table.unique(['name', 'type']);
  });

  const createTrialsProblems = knex.schema.createTable('trials_problems', (table) => {
    table.uuid('trial_id')
      .references('trials.id');
    table.uuid('problem_id')
      .references('problems.id');

    table.enu('role', [
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();

    table.primary(['trial_id', 'problem_id']);
  });

  const createInterventions = knex.schema.createTable('interventions', (table) => {
    table.uuid('id').primary();

    table.text('name')
      .notNullable();
    table.enu('type', [
      'drug',
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();

    table.unique(['name', 'type']);
  });

  const createTrialsInterventions = knex.schema.createTable('trials_interventions', (table) => {
    table.uuid('trial_id')
      .references('trials.id');
    table.uuid('intervention_id')
      .references('interventions.id');

    table.enu('role', [
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();

    table.primary(['trial_id', 'intervention_id']);
  });

  const createLocations = knex.schema.createTable('locations', (table) => {
    table.uuid('id').primary();

    table.text('name')
      .notNullable();
    table.enu('type', [
      'country',
      'city',
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();

    table.unique(['name', 'type']);
  });

  const createTrialsLocations = knex.schema.createTable('trials_locations', (table) => {
    table.uuid('trial_id')
      .references('trials.id');
    table.uuid('location_id')
      .references('locations.id');

    table.enu('role', [
      'recruitment_countries',
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();

    table.primary(['trial_id', 'location_id']);
  });

  const createOrganisations = knex.schema.createTable('organisations', (table) => {
    table.uuid('id').primary();

    table.text('name')
      .notNullable()
      .unique();
    table.enu('type', [
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();
  });

  const createTrialsOrganisations = knex.schema.createTable('trials_organisations', (table) => {
    table.uuid('trial_id')
      .references('trials.id');
    table.uuid('organisation_id')
      .references('organisations.id');

    table.enu('role', [
      'primary_sponsor',
      'sponsor',
      'funder',
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();

    table.primary(['trial_id', 'organisation_id']);
  });

  const createPersons = knex.schema.createTable('persons', (table) => {
    table.uuid('id').primary();

    table.text('name')
      .unique()  // FIXME: Why do we have this unique constraint?
      .notNullable();
    table.enu('type', [
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();
  });

  const createTrialsPersons = knex.schema.createTable('trials_persons', (table) => {
    table.uuid('trial_id')
      .references('trials.id');
    table.uuid('person_id')
      .references('persons.id');

    table.enu('role', [
      'principal_investigator',
      'public_queries',
      'scientific_queries',
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();

    table.primary(['trial_id', 'person_id']);
  });

  return Promise.all([
    createSources,
    createTrials,
    createRecords,
    createTrialsRecords,
    createPublications,
    createTrialsPublications,
    createDocuments,
    createTrialsDocuments,
    createProblems,
    createTrialsProblems,
    createInterventions,
    createTrialsInterventions,
    createLocations,
    createTrialsLocations,
    createOrganisations,
    createTrialsOrganisations,
    createPersons,
    createTrialsPersons,
  ]);
};

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('trials_persons')
    .dropTableIfExists('persons')
    .dropTableIfExists('trials_organisations')
    .dropTableIfExists('organisations')
    .dropTableIfExists('trials_locations')
    .dropTableIfExists('locations')
    .dropTableIfExists('trials_interventions')
    .dropTableIfExists('interventions')
    .dropTableIfExists('trials_problems')
    .dropTableIfExists('problems')
    .dropTableIfExists('trials_documents')
    .dropTableIfExists('documents')
    .dropTableIfExists('trials_publications')
    .dropTableIfExists('publications')
    .dropTableIfExists('trials_records')
    .dropTableIfExists('records')
    .dropTableIfExists('trials')
    .dropTableIfExists('sources')
);
