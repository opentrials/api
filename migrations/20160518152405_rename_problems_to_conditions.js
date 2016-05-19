'use strict';

exports.up = (knex) => (
  knex.schema
    .table('trials_problems', (table) => {
      table.renameColumn('problem_id', 'condition_id');
    })
    .renameTable('problems', 'conditions')
    .renameTable('trials_problems', 'trials_conditions')
);

exports.down = (knex) => (
  knex.schema
    .table('trials_conditions', (table) => {
      table.renameColumn('condition_id', 'problem_id');
    })
    .renameTable('conditions', 'problems')
    .renameTable('trials_conditions', 'trials_problems')
);
