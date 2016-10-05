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
require('./risk_of_bias');

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
  'documents.file',
  'risks_of_bias',
  'risks_of_bias.risk_of_bias_criteria',
];

const Trial = BaseModel.extend({
  tableName: 'trials',
  visible: [
    'id',
    'source_id',
    'identifiers',
    'public_title',
    'brief_summary',
    'target_sample_size',
    'gender',
    'has_published_results',
    'status',
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
    attributes.risks_of_bias = [];

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
  risks_of_bias: function () {
    return this.hasMany('RiskOfBias');
  },
  virtuals: {
    url: function () {
      return helpers.urlFor(this);
    },
    sources: function () {
      const publicationsSources = this.related('publications')
                                      .toJSON()
                                      .map((publication) => publication.source);
      const recordsSources = this.related('records')
                                 .toJSON()
                                 .map((record) => record.source);
      const sources = [...publicationsSources,
                       ...recordsSources];

      const result = sources.reduce((data, source) => {
        data[source.id] = {
          id: source.id,
          name: source.name,
          url: source.url,
        };

        return data;
      }, {});

      return result;
    },
    discrepancies: function () {
      const discrepancyFields = [
        'target_sample_size',
        'gender',
        'status',
        'recruitment_status',
        'has_published_results',
      ];
      const records = this.related('records')
                          .toJSON()
                          .filter((record) => record.source.id !== 'euctr');
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
        const cleanValues = JSON.parse(JSON.stringify(values))

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
