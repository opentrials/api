'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const helpers = require('../helpers');

const Intervention = BaseModel.extend({
  tableName: 'interventions',
  visible: [
    'id',
    'name',
    'type',
  ],
  trials() {
    return this.belongsToMany('Trial', 'trials_interventions');
  },
  virtuals: {
    url() {
      return helpers.urlFor(this);
    },
  },
});

module.exports = bookshelf.model('Intervention', Intervention);
