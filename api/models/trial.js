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
  'documents.source',
  'documents.fda_approval',
  'documents.fda_approval.fda_application',
  'risks_of_bias',
  'risks_of_bias.source',
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
    'completion_date',
    'results_exemption_date',
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
    attributes.documents  = (relations.documents || []).map((doc) => doc.toJSONSummary());

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
    return this.belongsToMany('Document', 'trials_documents');
  },
  records: function () {
    return this.hasMany('Record');
  },
  risks_of_bias: function () {
    return this.hasMany('RiskOfBias');
  },
  toJSONSummary: function () {
    const attributes = this.toJSON();

    return {
      id: attributes.id,
      public_title: attributes.public_title,
      url: attributes.url,
    };
  },
  virtuals: {
    url: function () {
      return helpers.urlFor(this);
    },
    sources: function () {
      const publicationsSources = this.related('publications')
                                      .toJSON()
                                      .map((publication) => publication.source);
      const documentsSources = this.related('documents')
                                   .toJSON()
                                   .map((doc) => doc.source);
      const recordsSources = this.related('records')
                                 .toJSON()
                                 .map((record) => record.source);
      const robSources = this.related('risks_of_bias')
                             .toJSON()
                             .map((rob) => rob.source);

      const sources = [...publicationsSources,
                       ...documentsSources,
                       ...recordsSources,
                       ...robSources];

      const result = sources.reduce((data, source) => {
        if (source !== undefined) {
          data[source.id] = {
            id: source.id,
            name: source.name,
            source_url: source.source_url,
          };
        }

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
      const ignoredSources = ['euctr', 'ictrp'];
      const records = this.related('records')
                          .toJSON()
                          .filter((record) => ignoredSources.indexOf(record.source.id) === -1 );
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
}, {
  relatedModels,
});

module.exports = bookshelf.model('Trial', Trial);
