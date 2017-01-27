'use strict';

const Trial = require('../models/trial');
const Record = require('../models/record');

function getTrial(req, res) {
  const id = req.swagger.params.id.value;

  return new Trial({ id }).fetch({ withRelated: Trial.relatedModels })
    .then((trial) => {
      if (trial) {
        res.json(trial);
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

function getRecord(req, res) {
  const id = req.swagger.params.id.value;

  return new Record({ id }).fetch({ withRelated: Record.relatedModels })
    .then((record) => {
      if (record) {
        res.json(record);
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

function getRecords(req, res) {
  const id = req.swagger.params.id.value;

  return Record.query({ where: { trial_id: id } }).fetchAll({ withRelated: ['source'] })
    .then((records) => {
      res.json(records);
    })
    .catch((err) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  getTrial,
  getRecord,
  getRecords,
};
