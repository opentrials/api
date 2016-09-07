'use strict';

require('./file');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Document = BaseModel.extend({
  tableName: 'documents',
  visible: [
    'type',
    'name',
  ],
  file: function () {
    return this.belongsTo('File');
  },
  virtuals: {
    url: function () {
      return this.related('file').toJSON().url;
    },
    documentcloud_id: function () {
      return this.related('file').toJSON().documentcloud_id;
    },
    text: function () {
      return this.related('file').toJSON().text;
    },
  },
});

module.exports = bookshelf.model('Document', Document);
