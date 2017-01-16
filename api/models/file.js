'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const File = BaseModel.extend({
  tableName: 'files',
  visible: [
    'id',
    'source_url',
    'documentcloud_id',
    'sha1',
    'pages',
  ],
  serialize(...args) {
    const attributes = Object.assign(
      {},
      Object.getPrototypeOf(File.prototype).serialize.call(this, args)
    );

    if (attributes.pages) {
      attributes.pages = attributes.pages.map((text, num) => ({ text, num: num + 1 }));
    }

    return attributes;
  },
  toJSONSummary() {
    const attributes = this.toJSON();

    delete attributes.pages;

    return attributes;
  },
});

module.exports = bookshelf.model('File', File);
