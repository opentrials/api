/* eslint-disable no-console */
'use strict';

const client = require('../config').elasticsearch;
const Trial = require('../api/models/trial');
const Condition = require('../api/models/condition');
const Intervention = require('../api/models/intervention');
const Location = require('../api/models/location');
const Person = require('../api/models/person');
const Organisation = require('../api/models/organisation');


function getDiscrepancyRecordMapping(valueMapping) {
  return {
    properties: {
      field: {
        enabled: 'false',
      },
      records: {
        properties: {
          record_id: {
            type: 'string',
            index: 'not_analyzed',
          },
          source_name: {
            type: 'string',
            index: 'not_analyzed',
          },
          value: valueMapping,
        },
      },
    },
  };
}

const trialMapping = {
  dynamic_templates: [
    {
      identifiers_values_arent_analyzed: {
        path_match: 'identifiers.*',
        mapping: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
  ],
  properties: {
    brief_summary: {
      type: 'string',
    },
    url: {
      type: 'string',
      index: 'not_analyzed',
    },
    id: {
      type: 'string',
      index: 'not_analyzed',
    },
    source_id: {
      type: 'string',
      index: 'not_analyzed',
    },
    interventions: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'intervention',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    intervention: {
      type: 'string',
    },
    locations: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'location',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        type: {
          type: 'string',
          index: 'not_analyzed',
        },
        role: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    location: {
      type: 'string',
    },
    conditions: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'condition',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    condition: {
      type: 'string',
    },
    persons: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'person',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        role: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    person: {
      type: 'string',
    },
    organisations: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'organisation',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        role: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    organisation: {
      type: 'string',
    },
    publications: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        title: {
          type: 'string',
          copy_to: 'publication',
        },
      },
    },
    publication: {
      type: 'string',
    },
    discrepancies: {
      properties: {
        public_title: getDiscrepancyRecordMapping({
          type: 'string',
        }),
        brief_summary: getDiscrepancyRecordMapping({
          type: 'string',
        }),
        gender: getDiscrepancyRecordMapping({
          type: 'string',
          index: 'not_analyzed',
        }),
        target_sample_size: getDiscrepancyRecordMapping({
          type: 'integer',
        }),
        registration_date: getDiscrepancyRecordMapping({
          type: 'date',
          format: 'dateOptionalTime',
        }),
      },
    },
    public_title: {
      type: 'string',
    },
    target_sample_size: {
      type: 'integer',
    },
    gender: {
      type: 'string',
      index: 'not_analyzed',
    },
    has_published_results: {
      type: 'boolean',
    },
    recruitment_status: {
      type: 'string',
      index: 'not_analyzed',
    },
    registration_date: {
      type: 'date',
      format: 'dateOptionalTime',
    },
  },
};

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

const trialsIndex = {
  index: 'trials',
  body: {
    mappings: {
      trial: trialMapping,
    },
  },
};

const autocompleteIndex = {
  index: 'autocomplete',
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

function bulkIndexEntities(entities, index, indexType) {
  if (entities.length === 0) {
    return undefined;
  }

  const bulkBody = entities.models.reduce((result, entity) => {
    const action = {
      index: {
        _index: index,
        _type: indexType,
        _id: entity.id,
      },
    };
    return result.concat([action, JSON.stringify(entity)]);
  }, []);

  let result;
  if (bulkBody.length > 0) {
    result = client.bulk({
      body: bulkBody,
    });
  }

  return result;
}

function indexModel(model, index, indexType, _queryParams, fetchOptions) {
  return model.count().then((modelCount) => {
    const batchSize = 1000;
    console.info(
      `${modelCount} entities being indexed in "${index}/${indexType}" (${batchSize} at a time).`
    );
    let offset = 0;
    let chain = Promise.resolve();
    let done = 0;
    let left = modelCount;

    do {
      const queryParams = Object.assign(
        {},
        {
          orderBy: 'id',
          limit: batchSize,
          offset,
        },
        _queryParams
      );

      chain = chain
        .then(() => model.query(queryParams).fetchAll(fetchOptions))
        .then((entities) => bulkIndexEntities(entities, index, indexType))
        .then((resp) => {
          let count = (resp) ? resp.items.length : 0;
          left -= count;
          done += count;
          console.info(`${done} successfully reindexed (${left} remaining, ${count} at a time).`);
        });

      offset += batchSize;
    } while (offset <= modelCount);

    return chain.catch(console.error);
  });
}

function indexAutocompleteModel(model, indexType) {
  return indexModel(
    model,
    'autocomplete',
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

client.indices.delete({ index: 'trials', ignore: 404 })
  .then(() => client.indices.create(trialsIndex))
  .then(() => indexModel(Trial, 'trials', 'trial', {}, { withRelated: Trial.relatedModels }))
  .then(() => client.indices.delete({ index: 'autocomplete', ignore: 404 }))
  .then(() => client.indices.create(autocompleteIndex))
  .then(() => indexAutocompleteModel(Condition, 'condition'))
  .then(() => indexAutocompleteModel(Intervention, 'intervention'))
  .then(() => indexAutocompleteModel(Location, 'location'))
  .then(() => indexAutocompleteModel(Person, 'person'))
  .then(() => indexAutocompleteModel(Organisation, 'organisation'))
  .then(() => process.exit())
  .catch((err) => {
    throw err;
  });
