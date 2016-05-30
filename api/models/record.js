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
  tableName: 'records',
  hasTimestamps: true,
  visible: [
    'id',
    'trial_id',
    'source',
    'source_url',
    'source_data',
    'public_title',
    'brief_summary',
    'target_sample_size',
    'gender',
    'recruitment_status',
    'registration_date',
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
