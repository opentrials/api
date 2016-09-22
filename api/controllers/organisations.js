'use strict';

const Organisation = require('../models/organisation');

function getOrganisation(req, res) {
  const id = req.swagger.params.id.value;

  return new Organisation({ id: id }).fetch({})
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((organisation) => {
      if (organisation) {
        res.json(organisation);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

module.exports = {
  getOrganisation,
}
