'use strict';

const DocumentCategory = require('../models/document_category');

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
  listDocumentCategories,
};
