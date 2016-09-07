'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const File = BaseModel.extend({
  tableName: 'files',
  visible: [
    'url',
    'documentcloud_id',
    'text',
  ],
});

module.exports = bookshelf.model('File', File);
