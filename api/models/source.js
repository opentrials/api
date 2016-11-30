'use strict';

require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Source = BaseModel.extend({
  tableName: 'sources',
  visible: [
    'id',
    'name',
    'source_url',
    'terms_and_conditions_url',
    'type',
  ],
});

module.exports = bookshelf.model('Source', Source);
