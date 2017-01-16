'use strict';

const Publication = require('../models/publication');

function getPublication(req, res) {
  const id = req.swagger.params.id.value;
  return new Publication({ id }).fetch({ withRelated: Publication.relatedModels })
    .then((publication) => {
      if (publication) {
        res.json(publication);
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
  getPublication,
};
