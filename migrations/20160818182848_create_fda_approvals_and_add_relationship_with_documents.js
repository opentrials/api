'use strict';

exports.up = (knex) => (
    knex.schema
      .createTable('fda_approvals', (table) => {
        table.text('id').primary();

        table.uuid('intervention_id')
          .notNullable()
          .references('interventions.id');
        table.integer('supplement_number')
          .notNullable();
        table.text('type')
          .notNullable()
          .index();
        table.date('action_date')
          .notNullable();
        table.text('notes')
          .nullable();
        table.timestamps();

        table.unique(['intervention_id', 'supplement_number']);
      })
      .table('documents', (table) => {
        table.text('fda_approval_id')
          .nullable()
          .references('fda_approvals.id');
      })
      .raw('ALTER TABLE documents ALTER COLUMN trial_id DROP NOT NULL')
      .raw(`ALTER TABLE documents
            ADD CONSTRAINT trial_id_xor_fda_approval_id_check CHECK (
            (trial_id IS NULL AND fda_approval_id IS NOT NULL) OR
            (trial_id IS NOT NULL AND fda_approval_id IS NULL)
      )`)
);

exports.down = (knex) => (
    knex.schema
      .raw('ALTER TABLE documents ALTER COLUMN trial_id SET NOT NULL')
      .table('documents', (table) => {
        table.dropColumn('fda_approval_id');
      })
      .dropTableIfExists('fda_approvals')
);
