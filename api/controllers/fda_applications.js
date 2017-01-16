'use strict';

const FDAApplication = require('../models/fda_application');

function getFDAApplication(req, res) {
  const id = req.swagger.params.id.value;

  return new FDAApplication({ id }).fetch({
    withRelated: FDAApplication.relatedModels,
  })
    .then((fdaApplication) => {
      if (fdaApplication) {
        res.json(fdaApplication);
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

function listFDAApplications(req, res) {
  const params = req.swagger.params;
  const page = params.page.value;
  const perPage = params.per_page.value;

  return FDAApplication.fetchPage({
    page,
    pageSize: perPage,
    withRelated: FDAApplication.relatedModels,
  })
    .then((fdaApplications) => {
      const response = {
        total_count: fdaApplications.pagination.rowCount,
        items: fdaApplications.models,
      };
      res.json(response);
    })
    .catch((err) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  getFDAApplication,
  listFDAApplications,
};
