/* eslint-disable no-console, max-len */

'use strict';

const Promise = require('bluebird');
const client = require('../../config').elasticsearch;

const defaultBatchSize = 1000;

function indexModel(model, index, indexType, _queryParams, fetchOptions, entitiesConverter, _batchSize) {
  const batchSize = _batchSize || defaultBatchSize;
  let converter = entitiesConverter;
  if (converter === undefined) {
    converter = (entities) => entities;
  }

  return model.query(_queryParams).count().then((modelCount) => {
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
        .then(converter)
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

  const bulkBody = entities.reduce((result, entity) => {
    const action = {
      index: {
        _index: index,
        _type: indexType,
        _id: entity.id,
      },
    };

    if (entity._parent !== undefined) {
      action.index._parent = entity._parent;
      delete entity._parent;  // eslint-disable-line no-param-reassign
    }

    return [
      ...result,
      action,
      entity,
    ];
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
};
