'use strict';

const Trials = require('../models/trial');
const Records = require('../models/record');
const Locations = require('../models/location');
const Source = require('../models/source');

function getStats(req, res) {
  const promises = [
    Trials.count(),
    new Source().trialsPerSource(),
    new Trials().trialsPerYear(),
    new Locations().topLocations(),
    new Source().latestUpdatedDates(),
  ];

  Promise.all(promises)
    .then((results) => {
      res.json({
        trialsCount: parseInt(results[0]),
        trialsPerSource: results[1],
        trialsPerYear: results[2],
        topLocations: results[3],
        sourcesLatestUpdatedDate: results[4]
      });
    })
    .catch((e) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  get: getStats,
}
