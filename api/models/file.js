'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const File = BaseModel.extend({
  tableName: 'files',
  visible: [
    'id',
    'source_url',
    'documentcloud_id',
    'pages',
    'sha1',
  ],
  toJSONSummary: function () {
    const attributes = this.toJSON();

    delete attributes.pages;

    return attributes;
  },
});

module.exports = bookshelf.model('File', File);
