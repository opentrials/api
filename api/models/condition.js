'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Condition = BaseModel.extend({
  tableName: 'conditions',
  visible: [
    'id',
    'name',
    'type',
  ],
  trials: function () {
    return this.belongsToMany('Trial', 'trials_conditions',
      'condition_id', 'trial_id').withPivot(['role']);
  },
});

module.exports = bookshelf.model('Condition', Condition);
