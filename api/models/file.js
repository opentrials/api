'use strict';

const _ = require('lodash');
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

    const jsonSummary = {
      id: attributes.id,
      sha1: attributes.sha1,
      source_url:  attributes.source_url,
    }

    return _.omitBy(jsonSummary, _.isNil);
  },
});

module.exports = bookshelf.model('File', File);
