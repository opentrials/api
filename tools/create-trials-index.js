/* eslint-disable no-console */

const client = require('../config').elasticsearch;
const Trial = require('../api/models/trial');

const relatedModels = [
  'locations',
  'interventions',
];

new Trial().fetchAll({ withRelated: relatedModels })
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
    console.info(resp.items.length + ' trials successfully reindexed into ElasticSearch.');
    process.exit();
  }).catch((err) => {
    throw err;
  });
