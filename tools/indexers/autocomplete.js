'use strict';

const esHelpers = require('./helpers');
const Location = require('../../api/models/location');


const autocompleteModelMapping = {
  dynamic: 'strict',
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
    url: {
      type: 'string',
      index: 'not_analyzed',
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
      location: autocompleteModelMapping,
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
    .then(() => indexAutocompleteModel(Location, indexName, 'location'));
}


module.exports = {
  alias: 'autocomplete',
  index: autocompleteIndex,
  indexer,
};
