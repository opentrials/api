'use strict';

exports.up = (knex) => (
  knex.schema
    .raw(`
      ALTER TABLE trials
        ALTER COLUMN study_phase TYPE text[]
        USING array[study_phase]::text[]
    `)
    .raw(`
      ALTER TABLE records
        ALTER COLUMN study_phase TYPE text[]
        USING array[study_phase]::text[]
    `)
);

exports.down = (knex) => (
  knex.schema
    .raw(`
      ALTER TABLE trials
        ALTER COLUMN study_phase TYPE text
        USING array_to_string(study_phase, '|')
    `)
    .raw(`
      ALTER TABLE records
        ALTER COLUMN study_phase TYPE text
        USING array_to_string(study_phase, '|')
    `)
);
