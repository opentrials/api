const uuid = require('node-uuid');
const bookshelf = require('../../config').bookshelf;

const Trial = bookshelf.Model.extend({
  tableName: 'trials',
  visible: [
    'id',
    'public_title',
    'brief_summary',
    'registration_date',
  ],
  initialize: function () {
    this.on('saving', this.addIdIfNeeded);
  },
  addIdIfNeeded: (model) => {
    if (!model.attributes.id) {
      model.attributes.id = uuid.v1();
    }
  },
});

module.exports = Trial;
