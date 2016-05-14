'use strict';

const Trials = require('../models/trial');
const Records = require('../models/record');
const Locations = require('../models/location');
const Promise = require('bluebird');

function getStats(req, res) {
  let promises = [
    Trials.count(),
    Records.trialsPerRegistry(),
    Trials.trialsPerYear(),
    Locations.topLocations(),
    Records.lastRegistryUpdate(),
  ];

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
