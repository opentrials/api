'use strict';

const Intervention = require('../models/intervention');

function getIntervention(req, res) {
  const id = req.swagger.params.id.value;

  return new Intervention({ id: id }).fetch({})
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((intervention) => {
      if (intervention) {
        res.json(intervention);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

module.exports = {
  get: getIntervention,
}
