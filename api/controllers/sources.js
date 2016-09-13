'use strict';

const Source = require('../models/source');

function listSources(req, res) {
  return new Source().fetchAll()
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((sources) => {
      res.json(sources);
    });
}

module.exports = {
  list: listSources,
}
