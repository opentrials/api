'use strict';

exports.up = (knex, Promise) => {
  function addHasPublishedResultsAndGender(table) {
    table.boolean('has_published_results')
      .nullable();

    table.enu('gender', [
      'both',
      'male',
      'female',
    ]).nullable();
  }

  return Promise.all([
    knex.schema.table('trials', addHasPublishedResultsAndGender),
    knex.schema.table('trialrecords', addHasPublishedResultsAndGender),
  ]);
};

exports.down = (knex, Promise) => {
  function dropHasPublishedResultsAndGender(table) {
    table.dropColumns([
      'has_published_results',
      'gender',
    ]);
  }

  return Promise.all([
    knex.schema.table('trials', dropHasPublishedResultsAndGender),
    knex.schema.table('trialrecords', dropHasPublishedResultsAndGender),
  ]);
};
