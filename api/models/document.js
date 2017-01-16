'use strict';

require('./file');
require('./trial');
require('./source');
require('./fda_approval');

const _ = require('lodash');
const helpers = require('../helpers');
const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const relatedModels = [
  'file',
  'trials',
  'source',
  'fda_approval',
  'fda_approval.fda_application',
];

const Document = BaseModel.extend({
  tableName: 'documents',
  visible: [
    'id',
    'name',
    'type',
    'file',
    'trials',
    'source',
    'source_url',
    'fda_approval',
  ],
  serialize(...args) {
    const attributes = Object.assign(
      {},
      Object.getPrototypeOf(Document.prototype).serialize.call(this, args),
      {
        trials: this.related('trials').map((trial) => trial.toJSONSummary()),
      }
    );

    if (attributes.file !== undefined) {
      attributes.source_url = attributes.file.source_url;
    }

    return attributes;
  },
  file() {
    return this.belongsTo('File');
  },
  trials() {
    return this.belongsToMany('Trial', 'trials_documents');
  },
  source() {
    return this.belongsTo('Source');
  },
  fda_approval() {
    return this.belongsTo('FDAApproval');
  },
  toJSONSummary() {
    const isEmptyPlainObject = (value) => _.isPlainObject(value) && _.isEmpty(value);
    const isNilOrEmptyPlainObject = (value) => _.isNil(value) || isEmptyPlainObject(value);
    const attributes = Object.assign(
      this.toJSON(),
      {
        file: this.related('file').toJSONSummary(),
        fda_approval: this.related('fda_approval').toJSON(),
        trials: this.related('trials').map((t) => t.toJSONSummary()),
        source_id: this.attributes.source_id,
      }
    );

    delete attributes.source;

    return _.omitBy(attributes, isNilOrEmptyPlainObject);
  },
  toJSONWithoutPages() {
    const attributes = this.toJSON();

    if (attributes.file !== undefined) {
      delete attributes.file.pages;
    }

    return attributes;
  },
  virtuals: {
    url() {
      return helpers.urlFor(this);
    },
  },
}, {
  relatedModels,
});

module.exports = bookshelf.model('Document', Document);
