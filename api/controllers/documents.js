'use strict';

const Document = require('../models/document');

function getDocument(req, res) {
  const id = req.swagger.params.id.value;

  return new Document({ id }).fetch({
    withRelated: Document.relatedModels,
  })
    .then((doc) => {
      if (doc) {
        res.json(doc);
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

function listDocuments(req, res) {
  const params = req.swagger.params;
  const page = params.page.value;
  const perPage = params.per_page.value;

  return Document.fetchPage({
    page,
    pageSize: perPage,
    withRelated: Document.relatedModels,
  })
    .then((documents) => {
      const response = {
        total_count: documents.pagination.rowCount,
        items: documents.models.map((m) => m.toJSONSummary()),
      };
      res.json(response);
    })
    .catch((err) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  getDocument,
  listDocuments,
};
