'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Organisation = BaseModel.extend({
  tableName: 'organisations',
  visible: [
    'id',
    'name',
  ],
  trials: function () {
    return this.belongsToMany('Trial', 'trials_organisations',
      'organisation_id', 'trial_id').withPivot(['role']);
  },
});

module.exports = bookshelf.model('Organisation', Organisation);
