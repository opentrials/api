'use strict';

const Person = require('../models/person');

function getPerson(req, res) {
  const id = req.swagger.params.id.value;

  return new Person({ id: id }).fetch({})
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

module.exports = {
  get: getPerson,
}
