/* eslint-disable no-console */

const client = require('../config').elasticsearch;
const Trial = require('../api/models/trial');

const relatedModels = [
  'locations',
  'interventions',
];
const trialsIndex = {
  index: 'trials',
  body: {
    mappings: {
      trial: {
        properties: {
          brief_summary: {
            type: 'string',
          },
          id: {
            type: 'string',
            index: 'not_analyzed',
          },
          interventions: {
            properties: {
              attributes: {
                properties: {
                  id: {
                    type: 'string',
                    index: 'not_analyzed',
                  },
                  name: {
                    type: 'string',
                  },
                },
              },
            },
          },
          locations: {
            properties: {
              attributes: {
                properties: {
                  id: {
                    type: 'string',
                    index: 'not_analyzed',
                  },
                  name: {
                    type: 'string',
                    copy_to: 'location',
                  },
                  type: {
                    type: 'string',
                    index: 'not_analyzed',
                  },
                },
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
          public_title: {
            type: 'string',
          },
          registration_date: {
            type: 'date',
            format: 'strict_date_optional_time||epoch_millis',
          },
        },
      },
    },
  },
};

client.indices.delete({ index: 'trials' })
  .then(() => client.indices.create(trialsIndex))
  .then(() => new Trial().fetchAll({ withRelated: relatedModels }))
  .then((trials) => {
    const bulkBody = trials.models.reduce((result, trial) => {
      const action = {
        index: {
          _index: 'trials',
          _type: 'trial',
          _id: trial.id,
        },
      };
      return result.concat([action, trial.toJSON()]);
    }, []);

    return client.bulk({
      body: bulkBody,
    });
  }).then((resp) => {
    console.info(`${resp.items.length} trials successfully reindexed into ElasticSearch.`);
    process.exit();
  }).catch((err) => {
    throw err;
  });
