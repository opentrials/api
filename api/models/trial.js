const bookshelf = require('../../config').bookshelf;

const Trial = bookshelf.Model.extend({
  tableName: 'trials',
});

module.exports = Trial;
