'use strict';

const FdaApplication = require('../models/fda_application');

function getFdaApplication(req, res) {
  const id = req.swagger.params.id.value;

  return new FdaApplication({ id: id }).fetch({
      withRelated: ['fda_approvals', 'organisation'],
    })
    .catch((err) => {
      res.finish();
      throw err;
    })
    .then((fda_application) => {
      if (fda_application) {
        res.json(fda_application);
      } else {
        res.status(404);
        res.finish();
      }
    });
}

function getFdaApplications(req, res) {
  const params = req.swagger.params;
  const page = params.page.value;
  const perPage = params.per_page.value;

  return FdaApplication.fetchPage({
      page: page,
      pageSize: perPage,
      withRelated: ['fda_approvals', 'organisation'],
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
  getFdaApplication,
  getFdaApplications,
}
