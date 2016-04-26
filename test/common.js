'use strict';

process.env.NODE_ENV = 'test';

const config = require('../config');
const server = require('../server');
const factory = require('./factory');

function clearDB() {
  const tables = [
    'trials_locations',
    'locations',
    'trials_interventions',
    'interventions',
    'trials_problems',
    'problems',
    'trials_persons',
    'persons',
    'trials_organisations',
    'organisations',
    'trialrecords',
    'sources',
    'trials',
  ];
  const deferred = config.bookshelf.knex.migrate.latest();

  for (const tableName of tables) {
    // eslint-disable-next-line no-loop-func
    deferred.then(() => config.bookshelf.knex(tableName).select().del());
  }

  return deferred;
}

function toJSON(object) {
  return JSON.parse(JSON.stringify(object));
}


global.config = config;
global.server = server;
global.factory = factory;
global.clearDB = clearDB;
global.toJSON = toJSON;
