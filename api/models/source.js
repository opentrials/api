'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Source = BaseModel.extend({
  tableName: 'sources',
  visible: [
    'id',
    'name',
    'type',
  ],
  trials: function () {
    return this.belongsToMany('Trial', 'trialrecords',
      'source_id', 'trial_id').withPivot([
        'source_url',
        'updated_at',
      ]);
  },
});

module.exports = bookshelf.model('Source', Source);
