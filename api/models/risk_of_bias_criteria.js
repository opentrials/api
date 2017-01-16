'use strict';

require('./risk_of_bias');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const RiskOfBiasCriteria = BaseModel.extend({
  tableName: 'risk_of_bias_criterias',
  hasTimestamps: true,
  visible: [
    'id',
    'name',
    'value',
  ],
  risk_of_bias() {
    return this.belongsToMany('RiskOfBias', 'risk_of_biases_risk_of_bias_criterias',
      'risk_of_bias_id', 'risk_of_bias_criteria_id').withPivot(['value']);
  },
  virtuals: {
    value() {
      return this.pivot.attributes.value;
    },
  },
});

module.exports = bookshelf.model('RiskOfBiasCriteria', RiskOfBiasCriteria);
