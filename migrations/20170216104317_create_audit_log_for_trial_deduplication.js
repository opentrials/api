'use strict';

exports.up = (knex) =>
  knex.schema.createTable('trial_deduplication_logs', (table) => {
    table.increments();
    table.uuid('record_id')
      .references('records.id');
    table.uuid('trial_id')
      .references('trials.id');
    table.text('method')
      .notNullable();
    table.text('commit')
      .notNullable();
    table.timestamps(true, true);
    })
;

exports.down = (knex) =>
  knex.schema.dropTableIfExists('trial_deduplication_logs')
;
