'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Document = BaseModel.extend({
  tableName: 'documents',
  visible: [
    'type',
    'name',
    'url',
    'documentcloud_url',
    'text',
  ],
});

module.exports = bookshelf.model('Document', Document);
