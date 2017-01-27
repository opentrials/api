'use strict';

const Condition = require('../models/condition');

function getCondition(req, res) {
  const id = req.swagger.params.id.value;

  return new Condition({ id }).fetch({})
    .then((condition) => {
      if (condition) {
        res.json(condition);
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
  getCondition,
};
