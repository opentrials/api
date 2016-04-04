const config = require('../../config');

function urlFor(model) {
  return `${config.url}/v1/${model.tableName}/${model.id}`;
}

module.exports = urlFor;
