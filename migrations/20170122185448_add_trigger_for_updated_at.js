'use strict';

const Promise = require('bluebird');

const tablesWithTimestamps = ['conditions', 'fda_applications', 'fda_approvals',
  'interventions', 'locations', 'organisations', 'persons', 'publications',
  'records', 'risk_of_bias_criterias', 'risk_of_biases', 'sources', 'trials'];

exports.up = (knex) => (
  knex.raw(
    `CREATE FUNCTION set_updated_at()
      RETURNS TRIGGER
      LANGUAGE plpgsql
    AS $$
    BEGIN
      NEW.updated_at := now();
      RETURN NEW;
    END;
    $$;`
  ).then(() =>
     Promise.map(tablesWithTimestamps, (table) =>
      knex.raw(
        `CREATE TRIGGER ${table}_set_updated_at
        BEFORE UPDATE ON ${table}
        FOR EACH ROW EXECUTE PROCEDURE set_updated_at();`
      )
    )
  )
);

exports.down = (knex) => (
   Promise.map(tablesWithTimestamps, (table) =>
    knex.raw(`DROP TRIGGER ${table}_set_updated_at ON ${table};`)
  ).then(() =>
    knex.raw('DROP FUNCTION set_updated_at();')
  )
);
