'use strict';

require('./location');
require('./intervention');
require('./problem');
require('./person');
require('./organisation');
require('./source');

const helpers = require('../helpers');
const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const relatedModels = [
  'locations',
  'interventions',
  'problems',
  'persons',
  'organisations',
  'sources',
];

const Trial = BaseModel.extend({
  tableName: 'trials',
  visible: [
    'id',
    'url',
    'public_title',
    'brief_summary',
    'target_sample_size',
    'gender',
    'has_published_results',
    'registration_date',
  ].concat(relatedModels),
  serialize: function (options) {
    const attributes = this.attributes;
    const relations = this.relations;

    attributes.url = helpers.urlFor(this);

    // FIXME: This is a workaround because Swagger doesn't allow nullable
    // fields. Check https://github.com/OAI/OpenAPI-Specification/issues/229.
    Object.keys(attributes).forEach((key) => {
      if (attributes[key] === null) {
        delete attributes[key];
      }
    });

    attributes.locations = [];
    attributes.interventions = [];
    attributes.problems = [];
    attributes.persons = [];
    attributes.organisations = [];
    attributes.sources = [];

    for (let relationName of Object.keys(relations)) {
      attributes[relationName] = relations[relationName].map((model) => {
        const attributes = model.toJSON();
        delete attributes._pivot_role;
        const result = {
          attributes: attributes,
        }

        Object.keys(model.pivot.attributes).forEach((key) => {
          const value = model.pivot.attributes[key];
          if (!key.endsWith('_id') && value) {
            result[key] = value;
          }
        });

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
  sources: function () {
    return this.belongsToMany('Source', 'trialrecords',
      'trial_id', 'source_id').withPivot([
        'source_url',
        'source_data',
        'updated_at',
      ]);
  },
}, {
  relatedModels,
});

module.exports = bookshelf.model('Trial', Trial);
