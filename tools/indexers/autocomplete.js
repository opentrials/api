'use strict';

const esHelpers = require('./helpers');
const Condition = require('../../api/models/condition');
const Intervention = require('../../api/models/intervention');
const Location = require('../../api/models/location');
const Person = require('../../api/models/person');
const Organisation = require('../../api/models/organisation');


const autocompleteModelMapping = {
  properties: {
    id: {
      type: 'string',
      index: 'not_analyzed',
    },
    name: {
      type: 'string',
      analyzer: 'autocomplete',
      search_analyzer: 'standard',
    },
  },
};


const autocompleteIndex = {
  body: {
    settings: {
      analysis: {
        filter: {
          autocomplete_filter: {
            type: 'edge_ngram',
            min_gram: 1,
            max_gram: 20,
          },
        },
        analyzer: {
          autocomplete: {
            type: 'custom',
            tokenizer: 'standard',
            filter: [
              'lowercase',
              'autocomplete_filter',
            ],
          },
        },
      },
    },
    mappings: {
      condition: autocompleteModelMapping,
      intervention: autocompleteModelMapping,
      location: autocompleteModelMapping,
      person: autocompleteModelMapping,
      organisation: autocompleteModelMapping,
    },
  },
};


function indexAutocompleteModel(model, index, indexType) {
  return esHelpers.indexModel(
    model,
    index,
    indexType,
    {
      // Filter out entities without trials
      innerJoin: [
        `trials_${indexType}s`,
        `${indexType}s.id`,
        `trials_${indexType}s.${indexType}_id`,
      ],
      // Remove duplicates
      groupBy: 'id',
    },
    {
      columns: ['id', 'name'],
    }
  );
}


function indexer(indexName) {
  return Promise.resolve()
    .then(() => indexAutocompleteModel(Condition, indexName, 'condition'))
    .then(() => indexAutocompleteModel(Intervention, indexName, 'intervention'))
    .then(() => indexAutocompleteModel(Location, indexName, 'location'))
    .then(() => indexAutocompleteModel(Person, indexName, 'person'))
    .then(() => indexAutocompleteModel(Organisation, indexName, 'organisation'));
}


module.exports = {
  alias: 'autocomplete',
  index: autocompleteIndex,
  indexer,
};
