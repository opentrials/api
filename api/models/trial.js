'use strict';

require('./location');
require('./intervention');
require('./condition');
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
  'conditions',
  'persons',
  'organisations',
  'records',
  'records.source',
];

const Trial = BaseModel.extend({
  tableName: 'trials',
  visible: [
    'id',
    'primary_id',
    'identifiers',
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
    attributes.conditions = [];
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
  conditions: function () {
    return this.belongsToMany('Condition', 'trials_conditions',
        'trial_id', 'condition_id').withPivot(['role']);
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
  trialsPerYear: function () {
    return bookshelf.knex
      .select(
        bookshelf.knex.raw('to_char(registration_date, \'YYYY\')::int as year'),
        bookshelf.knex.raw('count(registration_date)::int')
      )
      .from('trials')
      .groupByRaw('year')
      .orderBy('year');
  },
}, {
  relatedModels,
});

module.exports = bookshelf.model('Trial', Trial);
