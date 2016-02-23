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

    let locations = [];
    if (relations.locations) {
      locations = relations.locations.map((loc) => {
        const locAttributes = loc.toJSON();
        const role = locAttributes._pivot_role;
        delete locAttributes._pivot_role;

        return {
          role: loc.pivot.attributes.role,
          'location': locAttributes,
        };
      });
    }
    attributes.locations = locations;

    let interventions = [];
    if (relations.interventions) {
      interventions = relations.interventions.map((loc) => {
        const locAttributes = loc.toJSON();

        return {
          role: loc.pivot.attributes.role,
          intervention: loc.toJSON(),
        };
      });
    }
    attributes.interventions = interventions;

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
