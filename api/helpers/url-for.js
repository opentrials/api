'use strict';

const config = require('../../config');

function urlFor(models) {
  if (!Array.isArray(models)) {
    models = [models];
  }
  const path = models.map((model) => `${model.tableName}/${model.id}`);
  return `${config.url}/v1/${path.join('/')}`;
}

module.exports = urlFor;
