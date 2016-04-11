const client = require('../../config').elasticsearch;

function search(indexType, params) {
  const page = params.page.value;
  const perPage = params.per_page.value;
  const searchQuery = {
    index: 'trials',
    type: indexType,
    q: params.q.value,
    from: (page - 1) * perPage,
    size: perPage,
    defaultOperator: 'AND',
  };

  return client.search(searchQuery)
    .then((esResult) => (
      {
        total_count: esResult.hits.total,
        items: esResult.hits.hits.map((hit) => hit._source),
      }
    ));
}

module.exports = search;
