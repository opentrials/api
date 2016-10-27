'use strict';

const FDAApplication = require('../models/fda_application');

function getFDAApplication(req, res) {
  const id = req.swagger.params.id.value;

  return new FDAApplication({ id: id }).fetch({
      withRelated: FDAApplication.relatedModels,
    })
    .then((fda_application) => {
      if (fda_application) {
        res.json(fda_application);
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
      page: page,
      pageSize: perPage,
      withRelated: FDAApplication.relatedModels,
    })
    .then((fda_applications) => {
      let response = {
        total_count: fda_applications.pagination.rowCount,
        items: fda_applications.models,
      }
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
}
