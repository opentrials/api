'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Problem = BaseModel.extend({
  tableName: 'problems',
  visible: [
    'id',
    'name',
    'type',
  ],
  trials: function () {
    return this.belongsToMany('Trial', 'trials_problems',
      'problem_id', 'trial_id').withPivot(['role']);
  },
});

module.exports = bookshelf.model('Problem', Problem);
