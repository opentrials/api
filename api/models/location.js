'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const helpers = require('../helpers');

const Location = BaseModel.extend({
  tableName: 'locations',
  visible: [
    'id',
    'name',
    'type',
  ],
  trials: function () {
    return this.belongsToMany('Trial', 'trials_locations',
      'location_id', 'trial_id').withPivot(['role']);
  },
  virtuals: {
    url: function () {
      return helpers.urlFor(this);
    },
  },
  topLocations: function () {
    return bookshelf.knex
      .select(
        bookshelf.knex.raw('location_id as id'),
        bookshelf.knex.raw('locations.name as name'),
        bookshelf.knex.raw('count(location_id)::int')
      )
      .from('trials_locations')
      .leftJoin('locations', 'location_id', 'locations.id')
      .groupBy('location_id', 'locations.name')
      .orderByRaw('count(location_id) desc')
      .limit(10);
  },
});

module.exports = bookshelf.model('Location', Location);
