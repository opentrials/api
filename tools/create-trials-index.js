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

function indexTrials(trials) {
  if (trials.length === 0) {
    return;
  }

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

  client.bulk({
    body: bulkBody,
  }).then((resp) => {
    console.info(`${resp.items.length} trials successfully reindexed.`);
  });
}

let chain = client.indices.delete({ index: 'trials', ignore: 404 })
  .then(() => client.indices.create(trialsIndex));

Trial.count().then((numberOfTrials) => {
  // Index trials in bulk going through `bufferLength` trials at a time.
  const bufferLength = 1000;
  let offset = 0;
  console.info(`${numberOfTrials} trials being indexed (${bufferLength} at a time).`);

  do {
    const queryParams = {
      limit: bufferLength,
      offset,
    };
    chain = chain
      .then(() => Trial.query(queryParams).fetchAll({ withRelated: relatedModels }))
      .then(indexTrials);
    offset = offset + bufferLength;
  } while (offset + bufferLength <= numberOfTrials);

  chain = chain
    .then(() => process.exit())
    .catch((err) => {
      throw err;
    });

  return chain;
});
