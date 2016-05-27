'use strict';

const Trial = require('../models/trial');
const Record = require('../models/record');

function getTrial(req, res) {
  const id = req.swagger.params.id.value;

  return new Trial({ id: id }).fetch({ withRelated: Trial.relatedModels })
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

function getRecord(req, res) {
  const id = req.swagger.params.id.value;

  return new Record({ id: id }).fetch({ withRelated: Record.relatedModels })
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((record) => {
      if (record) {
        res.json(record);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

function getRecords(req, res) {
  const id = req.swagger.params.id.value;

  return new Record({ trial_id: id }).fetchAll({ withRelated: Record.relatedModels })
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((records) => {
      res.json(records);
    });
}

module.exports = {
  get: getTrial,
  getRecord,
  getRecords,
}
