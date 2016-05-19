'use strict';

const Publication = require('../models/publication');

function getPublication(req, res) {
  const id = req.swagger.params.id.value;
  return new Publication({ id: id }).fetch({ withRelated: Publication.relatedModels })
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((publication) => {
      if (publication) {
        res.json(publication);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

module.exports = {
  get: getPublication,
}
