'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const File = BaseModel.extend({
  tableName: 'files',
  visible: [
    'id',
    'source_url',
    'documentcloud_id',
    'text',
    'sha1',
  ],
  toJSONSummary: function () {
    const attributes = this.toJSON();

    return {
      id: attributes.id,
      sha1: attributes.sha1,
      source_url:  attributes.source_url,
    };
  },
});

module.exports = bookshelf.model('File', File);
