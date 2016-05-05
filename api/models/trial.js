'use strict';

require('./location');
require('./intervention');
require('./problem');
require('./person');
require('./organisation');
require('./source');
require('./record');

const helpers = require('../helpers');
const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const relatedModels = [
  'locations',
  'interventions',
  'problems',
  'persons',
  'organisations',
  'records',
  'records.source',
];

const Trial = BaseModel.extend({
  tableName: 'trials',
  visible: [
    'id',
    'public_title',
    'brief_summary',
    'target_sample_size',
    'gender',
    'has_published_results',
    'registration_date',
  ].concat(relatedModels),
  serialize: function (options) {
    const attributes = Object.assign(
      {},
      Object.getPrototypeOf(Trial.prototype).serialize.call(this, arguments)
    );
    const relations = this.relations;

    attributes.locations = [];
    attributes.interventions = [];
    attributes.problems = [];
    attributes.persons = [];
    attributes.organisations = [];

    for (let relationName of Object.keys(relations)) {
      attributes[relationName] = relations[relationName].map((model) => {
        const attributes = model.toJSON();
        const result = {
          attributes: attributes,
        }

        if (model.pivot) {
          Object.keys(model.pivot.attributes).forEach((key) => {
            const value = model.pivot.attributes[key];
            if (!key.endsWith('_id') && value) {
              result[key] = value;
            }
          });
        }

        return result;
      });
    }

    attributes.records = (relations.records || []).map((record) => record.toJSONSummary());

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
  records: function () {
    return this.hasMany('Record');
  },
  virtuals: {
    url: function () {
      return helpers.urlFor(this);
    },
  },
}, {
  relatedModels,
});

module.exports = bookshelf.model('Trial', Trial);
