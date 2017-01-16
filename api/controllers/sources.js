'use strict';

const Source = require('../models/source');

function listSources(req, res) {
  return new Source().fetchAll()
    .then((sources) => {
      res.json(sources);
    })
    .catch((err) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  list: listSources,
};
