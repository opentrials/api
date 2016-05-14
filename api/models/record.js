'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const Trial = require('./trial');
const Source = require('./source');
const helpers = require('../helpers');
const relatedModels = [
  'trial',
  'source',
];

const Record = BaseModel.extend({
  tableName: 'trialrecords',
  hasTimestamps: true,
  visible: [
    'id',
    'trial_id',
    'source',
    'source_url',
    'source_data',
    'public_title',
    'created_at',
    'updated_at',
  ],
  trial: function () {
    return this.belongsTo('Trial');
  },
  source: function () {
    return this.belongsTo('Source');
  },
  toJSONSummary: function () {
    const attributes = this.toJSON();
    const result = {
      id: attributes.id,
      source: this.related('source').toJSON(),
    };

    if (attributes.url) {
      result.url = attributes.url;
    }
    if (attributes.source_url) {
      result.source_url = attributes.source_url;
    }
    if (attributes.updated_at) {
      result.updated_at = attributes.updated_at;
    }

    return result;
  },
  virtuals: {
    url: function () {
      const fakeTrial = { id: this.attributes.trial_id, tableName: 'trials' };
      const fakeRecord = { id: this.id, tableName: 'records' };
      return helpers.urlFor([fakeTrial, fakeRecord]);
    },
    trial_url: function () {
      return this.related('trial').url;
    }
  },
}, {
  relatedModels,
});

module.exports = bookshelf.model('Record', Record);

module.exports.trialsPerRegistry = function () {
  return bookshelf.knex
    .select(
      bookshelf.knex.raw('primary_register as registry'),
      bookshelf.knex.raw('count(primary_register)::int')
    )
    .from('trialrecords')
    .groupBy('primary_register')
    .orderBy('primary_register')
    .then((rows) => {
      return rows;
    });
};

module.exports.lastRegistryUpdate = function () {
  return bookshelf.knex
    .select(
      bookshelf.knex.raw('source_id as id'),
      bookshelf.knex.raw('sources.name as name'),
      bookshelf.knex.raw('max(trialrecords.updated_at) as updatedate')
    )
    .from('trialrecords')
    .leftJoin('sources', 'source_id', 'sources.id')
    .groupBy('source_id', 'sources.name')
    .then((rows) => {
      return rows.map((item) => {
        item.updatedate = (item.updatedate !== null) ? item.updatedate : ''
        return item;
      });
    });
};
