const config = require('../../config');

function urlFor(model) {
  return `http://${config.host}:${config.port}/v1/${model.tableName}/${model.id}`;
}

module.exports = urlFor;
