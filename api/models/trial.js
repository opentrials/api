require('./location');

const uuid = require('node-uuid');
const bookshelf = require('../../config').bookshelf;

const Trial = bookshelf.Model.extend({
  tableName: 'trials',
  visible: [
    'id',
    'public_title',
    'brief_summary',
    'registration_date',
    'locations',
  ],
  initialize: function () {
    this.on('saving', this.addIdIfNeeded);
  },
  addIdIfNeeded: (model) => {
    if (!model.attributes.id) {
      model.attributes.id = uuid.v1();
    }
  },
  locations: function () {
    return this.belongsToMany('Location', 'trials_locations',
      'trial_id', 'location_id');
  },
});

module.exports = bookshelf.model('Trial', Trial);
