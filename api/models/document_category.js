'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const DocumentCategory = BaseModel.extend({
  tableName: 'document_categories',
  visible: [
    'id',
    'name',
    'group',
  ],
});

module.exports = bookshelf.model('DocumentCategory', DocumentCategory);
