require('./trial');

const uuid = require('node-uuid');
const bookshelf = require('../../config').bookshelf;

const Location = bookshelf.Model.extend({
  tableName: 'locations',
  visible: [
    'id',
    'name',
    'type',
    '_pivot_role',
  ],
  initialize: function () {
    this.on('saving', this.addIdIfNeeded);
  },
  addIdIfNeeded: (model) => {
    if (!model.attributes.id) {
      model.attributes.id = uuid.v1();
    }
  },
  trials: function () {
    return this.belongsToMany('Trial', 'trials_locations',
      'location_id', 'trial_id').withPivot(['role']);
  },
});

module.exports = bookshelf.model('Location', Location);
