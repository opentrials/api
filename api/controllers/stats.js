'use strict';

const Trials = require('../models/trial');
const bookshelf = require('../../config').bookshelf;
const Promise = require('bluebird');

function getTrialsCount() {
  return Trials.count();
}

function getTrialsPerRegistry() {
  return bookshelf.knex
    .select(
      bookshelf.knex.raw('primary_register as registry'),
      bookshelf.knex.raw('count(primary_register)::int')
    )
    .from('trialrecords').groupByRaw('primary_register')
    .then((rows) => {
      return rows;
    });
}

function getTrialsPerYear() {
  return bookshelf.knex
    .select(
      bookshelf.knex.raw('to_char(registration_date, \'YYYY\')::int as year'),
      bookshelf.knex.raw('count(registration_date)::int')
    )
    .from('trials')
    .groupByRaw('year')
    .orderBy('year')
    .then((rows) => {
      return rows;
    });
}

function getTopLocation() {
  return bookshelf.knex
    .select(
      bookshelf.knex.raw('location_id as id'),
      bookshelf.knex.raw('locations.name as name'),
      bookshelf.knex.raw('count(location_id)::int')
    )
    .from('trials_locations')
    .leftJoin('locations', 'location_id', 'locations.id')
    .groupBy('location_id', 'locations.name')
    .orderByRaw('count(location_id) desc')
    .limit(10)
    .then((rows) => {
      return rows;
    });
}

function getDateRegistry() {
  return bookshelf.knex
    .select(
      bookshelf.knex.raw('source_id as id'),
      bookshelf.knex.raw('sources.name as name'),
      bookshelf.knex.raw('max(trialrecords.updated_at) as updatedate')
    )
    .from('trialrecords')
    .leftJoin('sources', 'source_id', 'sources.id')
    .groupBy('source_id', 'sources.name')
    .then((rows) => {
      return rows.map((item) => {
        item.updatedate = (item.updatedate !== null) ? item.updatedate : ''
        return item;
      });
    });
}

function getStats(req, res) {
  let promises = [];
  promises.push(getTrialsCount());
  promises.push(getTrialsPerRegistry());
  promises.push(getTrialsPerYear());
  promises.push(getTopLocation());
  promises.push(getDateRegistry());


  Promise.all(promises)
    .then((results) => {
    res.json({
      trialsCount: parseInt(results[0]),
      trialsPerRegistry: results[1],
      trialsPerYear: results[2],
      topLocations: results[3],
      dateRegistry: results[4]
    });
  })
}

module.exports = {
  get: getStats,
}
