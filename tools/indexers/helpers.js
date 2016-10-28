'use strict';

const Promise = require('bluebird');
const client = require('../../config').elasticsearch;

const batchSize = 1000;

function indexModel(model, index, indexType, _queryParams, fetchOptions) {
  return model.count().then((modelCount) => {
    console.info(
      `${modelCount} entities being indexed in "${index}/${indexType}" (${batchSize} at a time).`
    );
    let offset = 0;
    let chain = Promise.resolve();
    let numReindexedModels = 0;

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
        .then((entities) => _bulkIndexEntities(entities, index, indexType))
        // eslint-disable-next-line no-loop-func
        .then((resp) => {
          const count = (resp) ? resp.items.length : 0;
          numReindexedModels += count;
          console.info(`${numReindexedModels} successfully reindexed, ${modelCount - numReindexedModels} remaining.`);
        });

      offset += batchSize;
    } while (offset <= modelCount);

    return chain.catch(console.error);
  });
}

function _bulkIndexEntities(entities, index, indexType) {
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

module.exports = {
  indexModel,
}
