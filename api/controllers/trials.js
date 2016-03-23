const Trial = require('../models/trial');

function getTrial(req, res) {
  const id = req.swagger.params.id.value;
  const relatedModels = [
    'locations',
    'interventions',
    'problems',
  ];

  return new Trial({ id: id }).fetch({ withRelated: relatedModels })
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

module.exports = {
  get: getTrial,
}
