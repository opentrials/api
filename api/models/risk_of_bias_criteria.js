'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
require('./risk_of_bias');

const relatedModels = [
  'risk_of_bias',
];

const RiskOfBiasCriteria = BaseModel.extend({
  tableName: 'risk_of_bias_criterias',
  hasTimestamps: true,
  visible: [
    'id',
    'name'
  ],
  risk_of_bias: function() {
    return this.belongsToMany('RiskOfBias', 'risk_of_biases_risk_of_bias_criterias',
      'risk_of_bias_id', 'risk_of_bias_criteria_id').withPivot(['value']);
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

module.exports = bookshelf.model('RiskOfBiasCriteria', RiskOfBiasCriteria);