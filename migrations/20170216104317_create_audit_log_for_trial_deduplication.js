'use strict';

exports.up = (knex) => (
  knex.schema
    .createTable('trial_deduplication_logs', (table) => {
      table.increments();

      table.uuid('record_id')
        .references('records.id')
        .notNullable();
      table.uuid('trial_id')
        .references('trials.id')
        .notNullable();
      table.text('method')
        .notNullable();
      table.text('commit');

      table.timestamps(true, true);
    })
    .raw(`
        CREATE TRIGGER trial_deduplication_logs_set_updated_at
        BEFORE UPDATE ON trial_deduplication_logs
        FOR EACH ROW EXECUTE PROCEDURE set_updated_at()
    `)
);

exports.down = (knex) => (
  knex.schema.dropTableIfExists('trial_deduplication_logs')
);
