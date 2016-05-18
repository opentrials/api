'use strict';

const Condition = require('../models/condition');

function getCondition(req, res) {
  const id = req.swagger.params.id.value;

  return new Condition({ id: id }).fetch({})
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((condition) => {
      if (condition) {
        res.json(condition);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

module.exports = {
  get: getCondition,
}
