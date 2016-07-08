'use strict';

require('./location');
require('./intervention');
require('./condition');
require('./person');
require('./organisation');
require('./source');
require('./document');
require('./record');
require('./publication');

const _ = require('lodash');
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
  'publications',
  'publications.source',
  'documents',
];

const Trial = BaseModel.extend({
  tableName: 'trials',
  visible: [
    'id',
    'primary_source_id',
    'identifiers',
    'public_title',
    'brief_summary',
    'target_sample_size',
    'gender',
    'has_published_results',
    'recruitment_status',
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

        if (model.pivot) {
          Object.keys(model.pivot.attributes).forEach((key) => {
            const value = model.pivot.attributes[key];
            if (!key.endsWith('_id') && value) {
              attributes[key] = value;
            }
          });
        }

        return attributes;
      });
    }

    attributes.records = (relations.records || []).map((record) => record.toJSONSummary());
    attributes.publications  = (relations.publications || []).map((publication) => publication.toJSONSummary());

    return attributes;
  },
  locations: function () {
    return this.belongsToMany('Location', 'trials_locations',
      'trial_id', 'location_id').withPivot(['role']);
  },
  interventions: function () {
    return this.belongsToMany('Intervention', 'trials_interventions');
  },
  conditions: function () {
    return this.belongsToMany('Condition', 'trials_conditions');
  },
  persons: function () {
    return this.belongsToMany('Person', 'trials_persons',
        'trial_id', 'person_id').withPivot(['role']);
  },
  organisations: function () {
    return this.belongsToMany('Organisation', 'trials_organisations',
      'trial_id', 'organisation_id').withPivot(['role']);
  },
  publications: function () {
    return this.belongsToMany('Publication', 'trials_publications',
      'trial_id', 'publication_id');
  },
  documents: function () {
    return this.hasMany('Document');
  },
  records: function () {
    return this.hasMany('Record');
  },
  virtuals: {
    url: function () {
      return helpers.urlFor(this);
    },
    discrepancies: function () {
      const discrepancyFields = [
        'public_title',
        'brief_summary',
        'target_sample_size',
        'gender',
        'registration_date',
        'recruitment_status',
      ];
      const records = this.related('records').toJSON();
      let discrepancies;

      for (const field of discrepancyFields) {
        const values = records.reduce((result, record) => {
          if (record[field] !== undefined) {
            result.push({
              record_id: record.id,
              source_name: record.source.name,
              value: record[field],
            });
          }

          return result;
        }, []);

        // Have to convert to JSON to handle values that normally aren't
        // comparable like dates.
        // We also remove whitespaces and punctuation to make sure they don't
        // influence in the discrepancy calculation
        const spaceAndPunctuation = /[\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~\s]/g;
        const cleanValues = JSON.parse(JSON.stringify(values)).map((v) => {
          v.value = v.value
                      .toString()
                      .replace(spaceAndPunctuation, '')
                      .toLowerCase();
          return v;
        });

        const hasDiscrepantValues = (_.uniqBy(cleanValues, 'value').length > 1);
        if (hasDiscrepantValues) {
          discrepancies = discrepancies || {};
          discrepancies[field] = values;
        }
      }

      return discrepancies;
    },
  },
  trialsPerYear: function () {
    return bookshelf.knex
      .select(
        bookshelf.knex.raw('to_char(registration_date, \'YYYY\')::int as year'),
        bookshelf.knex.raw('count(registration_date)::int')
      )
      .from('trials')
      .whereNotNull('registration_date')
      .groupByRaw('year')
      .orderBy('year');
  },
}, {
  relatedModels,
});

module.exports = bookshelf.model('Trial', Trial);
