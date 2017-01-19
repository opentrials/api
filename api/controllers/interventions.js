'use strict';

const Intervention = require('../models/intervention');

function getIntervention(req, res) {
  const id = req.swagger.params.id.value;

  return new Intervention({ id }).fetch({})
    .then((intervention) => {
      if (intervention) {
        res.json(intervention);
      } else {
        res.status(404);
        res.finish();
      }
    })
    .catch((err) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  getIntervention,
};
