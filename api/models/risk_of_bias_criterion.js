'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const RiskOfBias = require('./risk_of_bias');
const helpers = require('../helpers');

const relatedModels = [
  'risk_of_bias',
];

const RiskOfBiasCriterion = BaseModel.extend({
  tableName: 'risk_of_bias_criterion',
  hasTimestamps: false,
  visible: [
    'id',
    'name'
  ],
  risk_of_bias: function() {
    return this.belongsToMany('RiskOfBias', 'risks_of_bias_risk_of_bias_criteria',
      'risk_of_bias_id', 'risk_of_bias_criterion_id').withPivot(['value']);
  },
  toJSONSummary: function () {
    const attributes = this.toJSON();
    const result = {
      id: attributes.id,
      name: attributes.name
    };
    return result;
  }
}, {
  relatedModels
});

module.exports = bookshelf.model('RiskOfBiasCriterion', RiskOfBiasCriterion);