'use strict';

exports.up = (knex) => (
  knex.schema.renameTable('trialrecords', 'records')
);

exports.down = (knex) => (
  knex.schema.renameTable('records', 'trialrecords')
);
