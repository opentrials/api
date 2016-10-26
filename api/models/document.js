'use strict';

require('./file');

const helpers = require('../helpers');
const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const relatedModels = [
  'file',
  'trials',
]

const Document = BaseModel.extend({
  tableName: 'documents',
  outputVirtuals: false,
  visible: [
    'id',
    'source_id',
    'name',
    'type',
    'trials',
    'file',
    'url',
  ],
  serialize: function (options) {
    const attributes = Object.assign(
      {},
      Object.getPrototypeOf(Document.prototype).serialize.call(this, arguments)
    );

    attributes.url = this.url;
    attributes.trials = (this.relations.trials || []).map((trial) => trial.toJSONSummary());

    if (attributes.file) {
      attributes.file = this.related('file').toJSONSummary();
    }

    return attributes
  },
  file: function () {
    return this.belongsTo('File');
  },
  trials: function () {
    return this.belongsToMany('Trial', 'trials_documents');
  },
  toJSONSummary: function () {
    const attributes = this.attributes;
    const fileURL = this.related('file').toJSON().source_url;

    const result = {
      name: attributes.name,
      type: attributes.type,
      source_url:  attributes.source_url,
      documentcloud_id: this.documentcloud_id,
      text: this.text,
    };

    if (fileURL) {
      result.source_url = fileURL;
    }
    return result;
  },
  virtuals: {
    url: function () {
      return helpers.urlFor(this);
    },
    documentcloud_id: function () {
      return this.related('file').toJSON().documentcloud_id;
    },
    text: function () {
      return this.related('file').toJSON().text;
    },
  },
}, {
    relatedModels
});

module.exports = bookshelf.model('Document', Document);
