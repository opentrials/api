require('./location');
require('./intervention');
require('./person');

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
    'problems',
    'persons',
    'organisations',
  ],
  serialize: function (options) {
    const attributes = this.attributes;
    const relations = this.relations;

    attributes.locations = [];
    attributes.interventions = [];
    attributes.problems = [];
    attributes.persons = [];
    attributes.organisations = [];

    for (let relationName of Object.keys(relations)) {
      attributes[relationName] = relations[relationName].map((model) => {
        const attributes = model.toJSON();
        delete attributes._pivot_role;
        const result = {
          attributes: attributes,
        }

        if (model.pivot.attributes.role) {
          result.role = model.pivot.attributes.role;
        };

        return result;
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
  problems: function () {
    return this.belongsToMany('Problem', 'trials_problems',
        'trial_id', 'problem_id').withPivot(['role']);
  },
  persons: function () {
    return this.belongsToMany('Person', 'trials_persons',
        'trial_id', 'person_id').withPivot(['role']);
  },
  organisations: function () {
    return this.belongsToMany('Organisation', 'trials_organisations',
      'trial_id', 'organisation_id').withPivot(['role']);
  },
});

module.exports = bookshelf.model('Trial', Trial);
