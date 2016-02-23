require('./location');
require('./intervention');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Trial = BaseModel.extend({
  tableName: 'trials',
  visible: [
    'id',
    'public_title',
    'brief_summary',
    'registration_date',
    'locations',
    'interventions',
  ],
  serialize: function(options) {
    const attributes = this.attributes;
    const relations = this.relations;

    attributes.locations = [];
    attributes.interventions = [];

    for (let relationName of Object.keys(relations)) {
      attributes[relationName] = relations[relationName].map((model) => {
        const attributes = model.toJSON();
        delete attributes._pivot_role;

        return {
          role: model.pivot.attributes.role,
          attributes: attributes,
        }
      });
    }

    return attributes;
  },
  locations: function () {
    return this.belongsToMany('Location', 'trials_locations',
      'trial_id', 'location_id').withPivot(['role']);
  },
  interventions: function () {
    return this.belongsToMany('Intervention', 'trials_interventions',
        'trial_id', 'intervention_id').withPivot(['role']);
  },
});

module.exports = bookshelf.model('Trial', Trial);
