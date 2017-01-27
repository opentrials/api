'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const helpers = require('../helpers');

const Organisation = BaseModel.extend({
  tableName: 'organisations',
  visible: [
    'id',
    'name',
  ],
  trials() {
    return this.belongsToMany('Trial', 'trials_organisations',
      'organisation_id', 'trial_id').withPivot(['role']);
  },
  virtuals: {
    url() {
      return helpers.urlFor(this);
    },
  },
});

module.exports = bookshelf.model('Organisation', Organisation);
