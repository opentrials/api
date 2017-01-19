'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const helpers = require('../helpers');

const Condition = BaseModel.extend({
  tableName: 'conditions',
  visible: [
    'id',
    'name',
  ],
  trials() {
    return this.belongsToMany('Trial', 'trials_conditions');
  },
  virtuals: {
    url() {
      return helpers.urlFor(this);
    },
  },
});

module.exports = bookshelf.model('Condition', Condition);
