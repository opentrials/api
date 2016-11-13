'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const _ = require('lodash');

const File = BaseModel.extend({
  tableName: 'files',
  visible: [
    'id',
    'source_url',
    'documentcloud_id',
    'sha1',
    'pages',
  ],
  serialize: function () {
    const attributes = Object.assign(
      {},
      Object.getPrototypeOf(File.prototype).serialize.call(this, arguments)
    );

    if (attributes.pages) {
      attributes.pages = attributes.pages.map((text, num) => ({ text, num: num + 1 }));
    }

    return attributes;
  },
  toJSONSummary: function () {
    const attributes = this.toJSON();

    if (typeof attributes.pages !== 'undefined' && attributes.pages.length > 0) {
      attributes.pagesPreview = this._getPagesPreview(attributes.pages, 300);
    }

    delete attributes.pages;

    return attributes;
  },
  _getPagesPreview(pages, limit) {
    const text = pages.slice(0, 2).map((obj) => obj.text).join(' ');

    if (typeof limit === 'undefined' || limit > text.length) {
      return text;
    }

    const cuttingPoint = (text + ' ').indexOf(' ', limit);
    const suffix = cuttingPoint < text.length ? ' [...]' : '';

    // it will cut right before the word hitting the limit
    return text.substr(0, cuttingPoint) + suffix;
  },
});

module.exports = bookshelf.model('File', File);
