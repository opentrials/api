'use strict';

require('./source');
require('./trial');
require('./risk_of_bias_criteria');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const RiskOfBias = BaseModel.extend({
  tableName: 'risk_of_biases',
  hasTimestamps: true,
  visible: [
    'id',
    'trial_id',
    'source_id',
    'source_url',
    'study_id',
    'risk_of_bias_criteria',
    'created_at',
    'updated_at',
    'source',
  ],
  source() {
    return this.belongsTo('Source', 'source_id');
  },
  risk_of_bias_criteria() {
    return this.belongsToMany('RiskOfBiasCriteria', 'risk_of_biases_risk_of_bias_criterias',
      'risk_of_bias_id', 'risk_of_bias_criteria_id').withPivot(['value']);
  },
});

module.exports = bookshelf.model('RiskOfBias', RiskOfBias);
