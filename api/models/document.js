'use strict';

require('./file');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Document = BaseModel.extend({
  tableName: 'documents',
  visible: [
    'type',
    'name',
    'url',
  ],
  file: function () {
    return this.belongsTo('File');
  },
  serialize: function (options) {
    const attributes = Object.assign(
      {},
      Object.getPrototypeOf(Document.prototype).serialize.call(this, arguments)
    );

    const fileURL = this.related('file').toJSON().url;
    if (fileURL) {
      attributes.url = fileURL;
    }

    return attributes;
  },
  virtuals: {
    documentcloud_id: function () {
      return this.related('file').toJSON().documentcloud_id;
    },
    text: function () {
      return this.related('file').toJSON().text;
    },
  },
});

module.exports = bookshelf.model('Document', Document);
