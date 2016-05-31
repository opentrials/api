'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const helpers = require('../helpers');

const Person = BaseModel.extend({
  tableName: 'persons',
  visible: [
    'id',
    'name',
  ],
  trials: function () {
    return this.belongsToMany('Trial', 'trials_persons',
      'person_id', 'trial_id').withPivot(['role']);
  },
  virtuals: {
    url: function () {
      return helpers.urlFor(this);
    },
  },
});

module.exports = bookshelf.model('Person', Person);
