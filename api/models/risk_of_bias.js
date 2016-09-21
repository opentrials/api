'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
require('./source');
require('./trial');
require('./risk_of_bias_criteria')
require('../helpers');

const relatedModels = [
  'source',
  'trial',
  'risk_of_bias_criteria'
];

const RiskOfBias = BaseModel.extend({
  tableName: 'risk_of_biases',
  hasTimestamps: true,
  visible: [
    'id',
    'trial_id',
    'source_id',
    'study_id',
    'source_url',
    'created_at',
    'updated_at'
  ],
  source: function () {
    return this.belongsTo('Source');
  },
  trial: function() {
    return this.belongsTo('Trial');
  },
  risk_of_bias_criteria: function() {
    return this.belongsToMany('RiskOfBiasCriteria', 'risk_of_biases_risk_of_bias_criterias',
      'risk_of_bias_id', 'risk_of_bias_criteria_id').withPivot(['value']);
  },
  toJSONSummary: function () {
    const attributes = this.toJSON();
    const result = {
      id: attributes.id,
      source_url: attributes.source_url,
      trial_id: attributes.trial_id
    };
    return result;
  }
}, {
  relatedModels
});

module.exports = bookshelf.model('RiskOfBias', RiskOfBias);
