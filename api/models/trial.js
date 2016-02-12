'use strict';

const bookshelf = require('../../config').bookshelf;

const Trial = bookshelf.Model.extend({
  tableName: 'trials',
  hasTimestamps: true,
});

module.exports = Trial;
