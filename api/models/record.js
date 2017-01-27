'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const helpers = require('../helpers');
require('./trial');
require('./source');

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
    'public_title',
    'brief_summary',
    'target_sample_size',
    'gender',
    'status',
    'recruitment_status',
    'registration_date',
    'completion_date',
    'results_exemption_date',
    'last_verification_date',
    'has_published_results',
    'is_primary',
    'created_at',
    'updated_at',
  ],
  trial() {
    return this.belongsTo('Trial');
  },
  source() {
    return this.belongsTo('Source', 'source_id');
  },
  toJSONSummary() {
    const attributes = this.toJSON();
    const result = {
      id: attributes.id,
      source_id: this.attributes.source_id,
      is_primary: this.attributes.is_primary,
    };

    if (attributes.last_verification_date) {
      result.last_verification_date = attributes.last_verification_date;
    }

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
    url() {
      const fakeTrial = { id: this.attributes.trial_id, tableName: 'trials' };
      const fakeRecord = { id: this.id, tableName: 'records' };
      return helpers.urlFor([fakeTrial, fakeRecord]);
    },
    trial_url() {
      const fakeTrial = { id: this.attributes.trial_id, tableName: 'trials' };
      return helpers.urlFor(fakeTrial);
    },
  },
}, {
  relatedModels,
});

module.exports = bookshelf.model('Record', Record);
