const Trial = require('../models/trial');

function _convertTimestamps(trial) {
  trial.attributes.created_at = new Date(trial.attributes.created_at);
  trial.attributes.updated_at = new Date(trial.attributes.updated_at);
  return trial;
}

function getTrial(req, res) {
  const id = req.swagger.params.id.value;

  return new Trial({ id: id }).fetch()
    .catch((err) => {
      // FIXME: We're ignoring errors for now, but we should at least log them.
    })
    .then((trial) => {
      if (trial) {
        _convertTimestamps(trial);
        res.json(trial);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

function listTrials(req, res) {
  return new Trial().fetchAll()
    .then((trials) => {
      for (let trial of trials.models) {
        _convertTimestamps(trial);
      }
      return res.json(trials);
    });
}

module.exports = {
  get: getTrial,
  list: listTrials,
}
