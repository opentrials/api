'use strict';

exports.up = (knex, Promise) => {
  const addSourceIdToProblems = knex.schema.table('problems', (table) => {
    table.uuid('source_id')
      .references('sources.id')
      .nullable();
  });

  const addSourceIdToInterventions = knex.schema.table('interventions', (table) => {
    table.uuid('source_id')
      .references('sources.id')
      .nullable();
  });

  const addSourceIdToLocations = knex.schema.table('locations', (table) => {
    table.uuid('source_id')
      .references('sources.id')
      .nullable();
  });

  const addSourceIdToOrganisations = knex.schema.table('organisations', (table) => {
    table.uuid('source_id')
      .references('sources.id')
      .nullable();
  });

  const addSourceIdToPersons = knex.schema.table('persons', (table) => {
    table.uuid('source_id')
      .references('sources.id')
      .nullable();
  });

  return Promise.all([
    addSourceIdToProblems,
    addSourceIdToInterventions,
    addSourceIdToLocations,
    addSourceIdToOrganisations,
    addSourceIdToPersons,
  ]);
};

exports.down = (knex, Promise) => {
  const removeSourceIdFromProblems = knex.schema.table('problems', (table) => {
    table.dropColumn('source_id');
  });

  const removeSourceIdFromInterventions = knex.schema.table('interventions', (table) => {
    table.dropColumn('source_id');
  });

  const removeSourceIdFromLocations = knex.schema.table('locations', (table) => {
    table.dropColumn('source_id');
  });

  const removeSourceIdFromOrganisations = knex.schema.table('organisations', (table) => {
    table.dropColumn('source_id');
  });

  const removeSourceIdFromPersons = knex.schema.table('persons', (table) => {
    table.dropColumn('source_id');
  });

  return Promise.all([
    removeSourceIdFromProblems,
    removeSourceIdFromInterventions,
    removeSourceIdFromLocations,
    removeSourceIdFromOrganisations,
    removeSourceIdFromPersons,
  ]);
};
