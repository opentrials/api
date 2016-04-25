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
});

module.exports = bookshelf.model('Source', Source);
