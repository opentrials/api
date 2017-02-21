'use strict';

const DocumentCategory = require('../models/document_category');

function getDocumentCategory(req, res) {
  const id = req.swagger.params.id.value;

  return new DocumentCategory({ id }).fetch()
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

function listDocumentCategories(req, res) {
  return DocumentCategory.fetchAll()
    .then((categories) => {
      const response = {
        total_count: categories.length,
        items: categories.models.map((m) => m.toJSON()),
      };
      res.json(response);
    })
    .catch((err) => {
      res.finish();
      throw err;
    });
}

module.exports = {
  getDocumentCategory,
  listDocumentCategories,
};
