'use strict';

exports.up = (knex, Promise) => {
  const updatePublications = knex.schema.table('publications', (table) => {
    // Add columns
    table.timestamps();
    table.specificType('primary_facts', 'text[]')
      .nullable()
      .index(undefined, 'GIN');
    table.specificType('secondary_facts', 'text[]')
      .nullable()
      .index(undefined, 'GIN');
    table.text('source_url')
      .notNullable();
    table.text('title')
      .notNullable();
    table.text('abstract')
      .notNullable();
    table.specificType('authors', 'text[]')
      .nullable();
    table.text('journal')
      .nullable();
    table.date('date')
      .nullable();

    // Remove columns
    table.dropColumn('name');
    table.dropColumn('type');
    table.dropColumn('data');
  });

  const updateTrialsPublications = knex.schema.table('trials_publications', (table) => {
    // Remove columns
    table.dropColumn('role');
    table.dropColumn('context');
  });

  return Promise.all([
    updatePublications,
    updateTrialsPublications,
  ]);
};

exports.down = (knex, Promise) => {
  const updatePublications = knex.schema.table('publications', (table) => {
    // Add columns
    table.text('name');
    table.enu('type', [
      'other',
    ]).nullable();
    table.jsonb('data')
      .notNullable();

    // Remove columns
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.dropColumn('primary_facts');
    table.dropColumn('secondary_facts');
    table.dropColumn('source_url');
    table.dropColumn('title');
    table.dropColumn('abstract');
    table.dropColumn('authors');
    table.dropColumn('journal');
    table.dropColumn('date');
  });

  const updateTrialsPublications = knex.schema.table('trials_publications', (table) => {
    // Add columns
    table.enu('role', [
      'other',
    ]).nullable();
    table.jsonb('context')
      .notNullable();
  });

  return Promise.all([
    updatePublications,
    updateTrialsPublications,
  ]);
};
