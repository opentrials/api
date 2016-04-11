const helpers = require('../helpers');
const Trial = require('../models/trial');

function getTrial(req, res) {
  const id = req.swagger.params.id.value;

  return new Trial({ id: id }).fetch({ withRelated: Trial.relatedModels })
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((trial) => {
      if (trial) {
        res.json(trial);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

function search(req, res) {
  return helpers.search('trial', req.swagger.params)
    .then(res.json)
    .catch((err) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  get: getTrial,
  search,
}
