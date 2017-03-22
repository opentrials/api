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
  'documents.document_category',
  'risks_of_bias',
  'risks_of_bias.source',
  'risks_of_bias.risk_of_bias_criteria',
  'source',
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
    'study_phase',
  ].concat(relatedModels),
  serialize(...args) {
    const attributes = Object.assign(
      {},
      Object.getPrototypeOf(Trial.prototype).serialize.call(this, args)
    );
    const relations = this.relations;
    const ignoredRelations = ['source'];
    const serializedRelations = _.difference(Object.keys(relations), ignoredRelations);

    attributes.locations = [];
    attributes.interventions = [];
    attributes.conditions = [];
    attributes.persons = [];
    attributes.organisations = [];
    attributes.risks_of_bias = [];

    for (const relationName of serializedRelations) {
      attributes[relationName] = relations[relationName].map((model) => {
        const attrs = model.toJSON();

        if (model.pivot) {
          Object.keys(model.pivot.attributes).forEach((key) => {
            const value = model.pivot.attributes[key];
            if (!key.endsWith('_id') && value) {
              attrs[key] = value;
            }
          });
        }

        return attrs;
      });
    }

    attributes.records = (relations.records || []).map((record) => record.toJSONSummary());
    attributes.publications = (relations.publications || []).map((pub) => pub.toJSONSummary());
    attributes.documents = (relations.documents || []).map((doc) => doc.toJSONSummary());

    return attributes;
  },
  locations() {
    return this.belongsToMany('Location', 'trials_locations',
      'trial_id', 'location_id').withPivot(['role']);
  },
  interventions() {
    return this.belongsToMany('Intervention', 'trials_interventions');
  },
  conditions() {
    return this.belongsToMany('Condition', 'trials_conditions');
  },
  persons() {
    return this.belongsToMany('Person', 'trials_persons',
        'trial_id', 'person_id').withPivot(['role']);
  },
  organisations() {
    return this.belongsToMany('Organisation', 'trials_organisations',
      'trial_id', 'organisation_id').withPivot(['role']);
  },
  publications() {
    return this.belongsToMany('Publication', 'trials_publications',
      'trial_id', 'publication_id');
  },
  documents() {
    return this.belongsToMany('Document', 'trials_documents');
  },
  records() {
    return this.hasMany('Record');
  },
  risks_of_bias() {
    return this.hasMany('RiskOfBias');
  },
  source() {
    return this.belongsTo('Source', 'source_id');
  },
  toJSONSummary() {
    const attributes = this.toJSON();

    return {
      id: attributes.id,
      public_title: attributes.public_title,
      url: attributes.url,
    };
  },
  virtuals: {
    url() {
      return helpers.urlFor(this);
    },
    sources() {
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
      const trialSource = this.related('source').toJSON().id !== undefined ?
            this.related('source').toJSON() :
            undefined;

      const sources = [
        trialSource,
        ...publicationsSources,
        ...documentsSources,
        ...recordsSources,
        ...robSources,
      ];

      const result = sources.reduce((data, source) => {
        if (source !== undefined) {
          // eslint-disable-next-line no-param-reassign
          data[source.id] = {
            id: source.id,
            name: source.name,
            type: source.type,
            source_url: source.source_url,
          };
        }

        return data;
      }, {});

      return result;
    },
    discrepancies() {
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
                          .filter((record) => ignoredSources.indexOf(record.source.id) === -1);
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
        const cleanValues = JSON.parse(JSON.stringify(values));

        const hasDiscrepantValues = (_.uniqBy(cleanValues, 'value').length > 1);
        if (hasDiscrepantValues) {
          discrepancies = discrepancies || {};
          discrepancies[field] = values;
        }
      }

      return discrepancies;
    },
    is_registered() {
      let status;
      const source = this.sources[this.attributes.source_id] || { type: null };
      if (source.type !== null) {
        status = source.type === 'register';
      }
      return status;
    },
  },
}, {
  relatedModels,
});

module.exports = bookshelf.model('Trial', Trial);
