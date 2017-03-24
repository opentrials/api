'use strict';

const Promise = require('bluebird');

const tablesWithTimestamps = [
  'conditions',
  'fda_approvals',
  'interventions',
  'locations',
  'organisations',
  'persons',
  'publications',
  'records',
  'sources',
  'trials',
];

exports.up = (knex) => (
  Promise.map(tablesWithTimestamps, (table) =>
    knex.schema.raw(
      `ALTER TABLE ${table}
      ALTER COLUMN created_at SET DEFAULT now(),
      ALTER COLUMN updated_at SET DEFAULT now();`
    )
  )
);

exports.down = (knex) => (
  Promise.map(tablesWithTimestamps, (table) =>
    knex.schema.raw(
      `ALTER TABLE ${table}
      ALTER COLUMN created_at DROP DEFAULT,
      ALTER COLUMN updated_at DROP DEFAULT;`
    )
  )
);
