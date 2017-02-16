'use strict';

exports.up = (knex) => (
  knex.schema
    .createTable('trial_deduplication_logs', (table) => {
      table.uuid('record_id')
        .primary();
      table.uuid('trial_id');

      table.text('method')
        .notNullable();
    	
    	table.text('commit')
    	   .notNullable();

      table.timestamps(true, true);

    })
    .raw(`ALTER TABLE trial_deduplication_logs ADD CONSTRAINT   
            trial_deduplication_logs_trials_id_foreign  FOREIGN KEY 
            (trial_id) REFERENCES trials (id);`)
    .raw(`ALTER TABLE trial_deduplication_logs ADD CONSTRAINT  
            trial_deduplication_logs_records_id_foreign FOREIGN KEY 
            (record_id) REFERENCES records (id);`)
);

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('trial_deduplication_logs')
);