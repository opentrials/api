'use strict';

require('./source');
require('./trial');
require('./risk_of_bias_criteria')

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const RiskOfBias = BaseModel.extend({
  tableName: 'risk_of_biases',
  hasTimestamps: true,
  visible: [
    'id',
    'trial_id',
    'source_id',
    'study_id',
    'source_url',
    'risk_of_bias_criteria',
    'created_at',
    'updated_at',
  ],
  risk_of_bias_criteria: function() {
    return this.belongsToMany('RiskOfBiasCriteria', 'risk_of_biases_risk_of_bias_criterias',
      'risk_of_bias_id', 'risk_of_bias_criteria_id').withPivot(['value']);
  },
});

module.exports = bookshelf.model('RiskOfBias', RiskOfBias);
