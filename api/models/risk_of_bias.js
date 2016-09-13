'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const Source = require('./source');
const Trial = require('./trial');
const RiskOfBiasCriterion = require('./risk_of_bias_criterion')
const helpers = require('../helpers');

const relatedModels = [
  'source',
  'trial',
  'risk_of_bias_criterion'
];

const RiskOfBias = BaseModel.extend({
  tableName: 'risks_of_bias',
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
    return this.belongsTo('Source', 'source_id');
  },
  trial: function() {
    return this.belongsTo('Trial', 'trial_id');
  },
  risk_of_bias_criterion: function() {
    return this.belongsToMany('RiskOfBiasCriterion', 'risks_of_bias_risk_of_bias_criteria',
      'risk_of_bias_id', 'risk_of_bias_criterion_id').withPivot(['value']);
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
