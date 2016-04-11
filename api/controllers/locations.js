const helpers = require('../helpers');
const Location = require('../models/location');

function list(req, res) {
  return new Location().fetchAll()
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then(res.json);
}

function search(req, res) {
  return helpers.search('location', req.swagger.params)
    .then(res.json)
    .catch((err) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  list,
  search,
}
