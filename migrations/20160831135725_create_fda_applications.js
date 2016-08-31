'use strict';

exports.up = (knex) => (
  knex.schema
    .createTable('fda_applications', (table) => {
      table.text('id')
        .primary();
      table.uuid('organisation_id')
        .nullable()
        .references('organisations.id');
      table.text('drug_name')
        .nullable();
      table.text('active_ingredients')
        .nullable();

      table.timestamps(true, true);
    })
    // Create initial fda_applications using IDs from interventions and
    // fda_approvals. This way, we can add the relationships during this
    // migration.
    .raw(`INSERT INTO fda_applications (id) (
            SELECT fda_application_number
            FROM interventions
            WHERE fda_application_number IS NOT NULL
            UNION
            SELECT regexp_replace(id, '-\\d+$', '')
            FROM fda_approvals
          )
    `)
    .table('interventions', (table) => {
      table.renameColumn('fda_application_number', 'fda_application_id');
      table.foreign('fda_application_id')
        .references('fda_applications.id')
        .onUpdate('CASCADE');
    })
    .table('fda_approvals', (table) => {
      table.dropColumn('intervention_id');
      table.text('fda_application_id')
        .nullable()
        .references('fda_applications.id')
        .onUpdate('CASCADE');

      table.unique(['fda_application_id', 'supplement_number']);
    })
    .raw(`UPDATE fda_approvals
          SET fda_application_id = regexp_replace(id, '-\\d+$', '')
    `)
    .raw(`ALTER TABLE fda_approvals
          ALTER COLUMN fda_application_id SET NOT NULL
    `)
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
