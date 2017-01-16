'use strict';

const config = require('../../config');

function urlFor(models) {
  const modelsArray = (Array.isArray(models)) ? models : [models];
  const hasModelsWithoutId = (modelsArray.find((m) => m.id === undefined) !== undefined);

  if (!hasModelsWithoutId) {
    const path = modelsArray.map((model) => `${model.tableName}/${model.id}`);
    return `${config.url}/v1/${path.join('/')}`;
  }

  return undefined;
}

module.exports = urlFor;
