const Trial = require('../models/trial');

function getTrial(req, res) {
  const id = req.swagger.params.id.value;

  return new Trial({ id: id }).fetch({ withRelated: ['locations', 'interventions'] })
    .catch((err) => {
      // FIXME: We're ignoring errors for now, but we should at least log them.
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
