'use strict';

exports.up = (knex) => (
  knex.schema
    .table('interventions', (table) => table.dropColumns(['data', 'facts']))
    .table('locations', (table) => table.dropColumns(['data', 'facts']))
    .table('documents', (table) => table.dropColumns(['type', 'data', 'facts']))
    .table('organisations', (table) => table.dropColumns(['type', 'data', 'facts']))
    .table('persons', (table) => table.dropColumns(['type', 'data', 'facts']))
    .table('conditions', (table) => table.dropColumns(['data', 'facts']))
    .table('publications', (table) => table.dropColumns(['facts']))
    .table('sources', (table) => table.dropColumns(['data']))
    .table('trials_documents', (table) => table.dropColumns(['role', 'context']))
    .table('trials_interventions', (table) => table.dropColumns(['role', 'context']))
    .table('trials_conditions', (table) => table.dropColumns(['role', 'context']))
    .table('trials_locations', (table) => table.dropColumns(['context']))
    .table('trials_organisations', (table) => table.dropColumns(['context']))
    .table('trials_persons', (table) => table.dropColumns(['context']))
);

exports.down = () => {
  throw Error('Destructive migration can\'t be rolled back.');
};
